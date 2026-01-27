import { NextResponse } from 'next/server';
import { commonApiCallingMethod, buildFetchURL, fetchAllSalesforceJobs } from '../../lib/salesforceApi';


const JOBS_PER_PAGE = 100; // Adjust based on performance testing
const MAX_JOBS_PER_FEED = 500; // Maximum jobs in a single feed


async function getSalesforceJobs(page = 1, limit = JOBS_PER_PAGE, cond = '') {
  try {
    console.log(`Fetching Salesforce jobs - Page ${page}`);

    // Build initial SOQL URL
    const fetchURL = buildFetchURL(cond, MAX_JOBS_PER_FEED);

    // 🔑 Fetch ALL records using cursor pagination
    const allJobs = await fetchAllSalesforceJobs(fetchURL);

    console.log(`Total jobs fetched from Salesforce: ${allJobs.length}`);

    const totalJobs = allJobs.length;
    const totalPages = Math.ceil(totalJobs / limit);

    const offset = (page - 1) * limit;
    const jobs = allJobs.slice(offset, offset + limit);

    return {
      jobs,
      totalJobs,
      totalPages,
      currentPage: page,
      hasMore: page < totalPages
    };
  } catch (error) {
    console.error('Salesforce fetch failed:', error);

    return {
      jobs: [],
      totalJobs: 0,
      totalPages: 0,
      currentPage: 1,
      hasMore: false,
      error: error.message
    };
  }
}


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(
      parseInt(searchParams.get('limit') || JOBS_PER_PAGE),
      MAX_JOBS_PER_FEED
    );

    const cond =
      searchParams.get('cond') === 'Single_job_xml_feed'
        ? `Single_job_xml_feed__c='Yes'`
        : '';

    if (page < 1 || limit < 1) {
      return new NextResponse('Invalid pagination params', { status: 400 });
    }

    const result = await getSalesforceJobs(page, limit, cond);

    if (
      result.totalJobs > 0 &&
      result.jobs.length === 0 &&
      page > result.totalPages
    ) {
      return new NextResponse('Page not found', { status: 404 });
    }

    const xml = generateJobsXML(
      result.jobs,
      'E-HealthJOBS',
      new Date().toISOString(),
      result
    );

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'X-Total-Jobs': result.totalJobs.toString(),
        'X-Current-Page': result.currentPage.toString(),
        'X-Total-Pages': result.totalPages.toString(),
        'X-Has-More': result.hasMore.toString()
      }
    });
  } catch (err) {
    return new NextResponse(
      `<jobs error="true"><!-- ${err.message} --></jobs>`,
      { status: 500, headers: { 'Content-Type': 'application/xml' } }
    );
  }
}


function generateJobsXML(jobs, publisher, feedDate, pagination) {
  const { currentPage, totalPages, totalJobs, hasMore, jobsPerPage, error } = pagination;
  
  // Add pagination info as XML comments
  const paginationInfo = `
    <!-- Feed Information -->
    <!-- Generated: ${feedDate} -->
    <!-- Publisher: ${publisher} -->
    <!-- Total Jobs Available: ${totalJobs} -->
    <!-- Current Page: ${currentPage} of ${totalPages} -->
    <!-- Jobs Per Page: ${jobsPerPage} -->
    <!-- Jobs In This Page: ${jobs.length} -->
    <!-- Has More Pages: ${hasMore} -->
    <!-- Data Source: Salesforce API -->
    ${error ? `<!-- API Error: ${error} -->` : ''}
    
    <!-- Usage Examples -->
    <!-- Next Page: ?page=${currentPage + 1} -->
    <!-- Previous Page: ?page=${Math.max(1, currentPage - 1)} -->
    <!-- Custom Limit: ?page=1&limit=50 -->
    <!-- Max Limit: ${Math.min(500, totalJobs)} -->`
  
  // Handle empty state
  if (!jobs || jobs.length === 0) {
    const emptyReason = totalJobs === 0 ? 'No jobs available in database' : 
                       error ? `API Error: ${error}` : 
                       'No jobs found for this page';
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<jobs publisher="${escapeXML(publisher)}" feed_date="${feedDate}" total_jobs="${totalJobs}" current_page="${currentPage}" total_pages="${totalPages}" jobs_in_page="0">
${paginationInfo}
    <!-- ${emptyReason} -->
</jobs>`;
  }

  // Generate job XML entries
  const jobsXML = jobs.map((job, index) => {
    try {
      // Handle potential null/undefined values safely with better defaults
      const title =
        job?.Scrapper_Job_Title__c ||
        job?.Name ||
        'Untitled Job';
      const datePosted = job?.Date_Posted__c || new Date().toISOString().split('T')[0];
      const empType = job?.Scrapper_Employement_Type__c?.trim() || 'Full-time';
      const empStatus = job?.Emp_Status__c?.trim() || '';
      const city = job?.City__c?.trim() || '';
      const state = job?.State__c?.trim() || '';
      const country = job?.Country__c?.trim() || '';
      const payRange = job?.Hourly_Pay_Range__c?.trim() || '';
      const description = job?.Job_Description__c?.trim() || 'Job description not available.';
      const website = process.env.NEXT_PUBLIC_BASE_URL || '';
      const jobId = job?.Id || `job-${currentPage}-${index + 1}`;
      
      // Additional Salesforce fields you might have
      const department = job?.Department__c?.trim() || '';
      const jobFunction = job?.Job_Function__c?.trim() || '';
      const experienceLevel = job?.Experience_Level__c?.trim() || '';
      const remote = job?.Remote_Work__c || false;
      
      return `    <job>
        <title>${escapeXML(title)}</title>
        <date_posted>${datePosted}</date_posted>
        <employment_type>${empType}</employment_type>
        <employment_status>${escapeXML(empStatus)}</employment_status>
        ${department ? `<department>${escapeXML(department)}</department>` : ''}
        ${jobFunction ? `<job_function>${escapeXML(jobFunction)}</job_function>` : ''}
        ${experienceLevel ? `<experience_level>${escapeXML(experienceLevel)}</experience_level>` : ''}
        <remote_work>${remote}</remote_work>
        
        <company>
            <n>${escapeXML(publisher)}</n>
            ${website ? `<website>${website}</website>` : ''}
        </company>
        
        <location>
            ${city ? `<city>${escapeXML(city)}</city>` : ''}
            ${state ? `<state>${escapeXML(state)}</state>` : ''}
            <country>${country}</country>
            ${city && state ? `<display_location>${escapeXML(city)}, ${state}</display_location>` : ''}
        </location>
        
        <compensation>
            ${payRange ? `<pay_range>${escapeXML(payRange)}</pay_range>` : ''}
            <currency>USD</currency>
        </compensation>
        
        <description><![CDATA[${description}]]></description>
        
        <metadata>
            <job_id>${jobId}</job_id>
            <source>E-HealthJOBS</source>
            <page_number>${currentPage}</page_number>
            <position_in_page>${index + 1}</position_in_page>
        </metadata>
        <job_url>${website ? `${website}/openJobs/${jobId}` : ''}</job_url>
    </job>`;
    } catch (jobError) {
      console.error(`Error processing job at index ${index}:`, jobError);
      return `    <!-- Error processing job at index ${index}: ${jobError.message} -->`;
    }
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<jobs publisher="${escapeXML(publisher)}" feed_date="${feedDate}" total_jobs="${totalJobs}" current_page="${currentPage}" total_pages="${totalPages}" has_more="${hasMore}" jobs_in_page="${jobs.length}">
${paginationInfo}
${jobsXML}
</jobs>`;
}

function escapeXML(str) {
  if (typeof str !== 'string' || !str) return str || '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters
}

// Handle OPTIONS request for CORS (if needed)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}