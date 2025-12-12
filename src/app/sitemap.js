// server-safe sitemap.js (drop-in replacement)
import { buildFetchURL, commonApiCallingMethod, totalCountQuery } from '../lib/salesforceApi';

function isAbsoluteUrl(u) {
  try { new URL(u); return true; } catch { return false; }
}

function escapeXml(s = '') {
  return String(s).replace(/[<>&'"]/g, c => ({ '<':'&lt;','>':'&gt;','&amp;':'&amp;','\'':'&apos;','"':'&quot;' }[c] || c));
}

// tolerant id getter: try common variants
function getJobId(job) {
  if (!job || typeof job !== 'object') return null;
  // common Salesforce patterns: Id, id, Id__c, JobId, maybe nested under attributes
  return (
    (typeof job.Id === 'string' && job.Id) ||
    (typeof job.id === 'string' && job.id) ||
    (typeof job.Id__c === 'string' && job.Id__c) ||
    (typeof job.JobId === 'string' && job.JobId) ||
    (job?.attributes?.Id && typeof job.attributes.Id === 'string' && job.attributes.Id) ||
    null
  );
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://e-healthjobs.com';

  if (!isAbsoluteUrl(baseUrl)) {
    console.error('[sitemap] invalid BASE_URL:', baseUrl);
  }

  // Default home entry
  const now = new Date().toISOString();
  const entries = [{
    url: baseUrl.replace(/\/$/, ''),
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
  }];

  try {
    // fetch total count and jobs (mirrors your original logic)
    const totalCountQueryStr = totalCountQuery();
    const totalCountResponse = await commonApiCallingMethod(totalCountQueryStr);
    const totalRecords = Number(totalCountResponse?.totalSize) || 0;

    // If you have 0 records, still build the fetchURL safely
    const fetchURL = buildFetchURL([], totalRecords, 0);
    const response = await commonApiCallingMethod(fetchURL);

    const jobs = Array.isArray(response?.records) ? response.records : (Array.isArray(response) ? response : []);

    // Log a sample so you can see the shape in prod logs
    if (Array.isArray(jobs)) {
      console.log('[sitemap] sample job records (first 10):', JSON.stringify(jobs.slice(0, 10), null, 2));
    } else {
      console.warn('[sitemap] jobs is not an array:', typeof jobs, jobs);
    }

    if (Array.isArray(jobs) && jobs.length > 0) {
      const jobUrls = jobs.map((job, idx) => {
        const id = getJobId(job);
        if (!id) {
          // log the problematic record (index + minimal info)
          console.warn(`[sitemap] skipping job at index ${idx} due to missing id. job keys:`, Object.keys(job || {}));
          return null;
        }

        const loc = `${baseUrl.replace(/\/$/, '')}/job-detail/${encodeURIComponent(String(id))}`;
        if (!isAbsoluteUrl(loc)) {
          console.warn(`[sitemap] skipping invalid url for job id=${id}:`, loc);
          return null;
        }

        return {
          url: loc,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.9,
        };
      }).filter(Boolean);

      entries.push(...jobUrls);
    } else {
      console.warn('[sitemap] no jobs to add to sitemap');
    }
  } catch (err) {
    console.error('[sitemap] failed to fetch jobs:', err && err.message ? err.message : err);
  }

  return entries;
}