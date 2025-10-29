import axios from './axiosInstance';

export async function fetchAllSalesforceJobs(language, fetchURL, isServerSide = false) {
  const baseURL = isServerSide 
    ? process.env.NEXT_PUBLIC_BASE_URL
    : '';
  
  let allRecords = [];
  let url = `${baseURL}/api/salesforce/getJobs/${language}/getJobsAccToURL/${encodeURIComponent(fetchURL)}`;
  let done = false;

  try {
    while (!done) {
      const response = await axios.get(url);

      if (response.data.done === false && response.data.nextRecordsUrl) {
        if (response.data.records && response.data.records.length > 0) {
          allRecords.push(...response.data.records);
        }
        url = `${baseURL}/api/salesforce/getJobs/${language}/getJobsAccToURL/${encodeURIComponent(response.data.nextRecordsUrl)}`;
      } else if (response.data.done === true) {
        allRecords = [...allRecords, ...(response.data.records || [])];
        done = true;
      }
    }

    return allRecords;

  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export function buildFetchURL(language, cond = '') {
  const region = language === "es" ? ".mx" : ".us";
  const condition = cond ? ` AND (${cond})` : '';
  return `services/data/v64.0/query?q=SELECT Id, Name, Category__c, Category_For_Job_Posting__c, Regions__c, JMPostalCode__c, Date_Posted__c, Job_Address__c, Industry__c, City__c, State__c, Country__c, Website__c, Emp_Status__c, Emp_Type__c, Hourly_Pay_Range__c, Job_Description__c FROM Job__c WHERE Status__c = 'Open' AND Website__c ='${region}' ${condition}`;
}