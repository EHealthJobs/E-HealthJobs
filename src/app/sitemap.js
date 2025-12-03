import { buildFetchURL, commonApiCallingMethod, totalCountQuery } from '../lib/salesforceApi';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  let jobUrls = [];
  
  try {
    const totalCountQueryStr = totalCountQuery();
    const totalCountResponse = await commonApiCallingMethod(totalCountQueryStr);
    const totalRecords = totalCountResponse.totalSize;
    const fetchURL = buildFetchURL([], totalRecords, 0);
    const response = await commonApiCallingMethod(fetchURL);
    
    const jobs = response?.records || response || [];
    
    
    if (Array.isArray(jobs) && jobs.length > 0) {
      jobUrls = jobs.map((job) => ({
        url: `${baseUrl}/jobs/${job.Id}`, 
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.9,
      }));
    } else {
      console.warn("No jobs found or jobs is not an array");
    }
  } catch (err) {
    console.error("Failed to fetch jobs for sitemap:", err);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...jobUrls,
  ];
}