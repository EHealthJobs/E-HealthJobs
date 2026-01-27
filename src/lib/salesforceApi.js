import jsforce from "jsforce";

let cachedConn = null;
let tokenExpiresAt = 0;

export async function salesforceService() {
  const now = Date.now();

  // ✅ reuse token if still valid
  if (cachedConn && tokenExpiresAt > now) {
    return cachedConn;
  }

  try {
    const tokenResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SALESFORCE_LOGIN_URL}/services/oauth2/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Token request failed: ${tokenResponse.status} - ${errorText}`);
    }

    const tokenData = await tokenResponse.json();

    cachedConn = new jsforce.Connection({
      instanceUrl: tokenData.instance_url,
      accessToken: tokenData.access_token,
      version: '64.0'
    });

    // Salesforce tokens usually last ~2 hours
    tokenExpiresAt = now + (tokenData.expires_in ?? 7200) * 1000;

    console.log("✅ Salesforce token cached");

    return cachedConn;

  } catch (error) {
    cachedConn = null;
    tokenExpiresAt = 0;
    console.error("❌ Salesforce auth failed:", error);
    throw error;
  }
}

export async function commonApiCallingMethod(url){
  try {
          const conn = await salesforceService();
          const options = {}
           const fetchUrl = `${conn.instanceUrl.replace(/\/+$/,'')}/${url.replace(/^\/+/,'')}`;
            console.log("Calling Salesforce URL:", fetchUrl);

            const response = await fetch(fetchUrl, {
            headers: {
                'Authorization': `Bearer ${conn.accessToken}`,
                'Content-Type': 'application/json'
            }
            });
          // Log status for debugging
          console.log("Salesforce API status:", response.status, response.statusText);

          const data = await response.json();       

          return data; 
      } catch (error) {
          console.error("Error fetching Salesforce response:", error);
          console.error("Error Type:", error.name);
          console.error("Error Code:", error.errorCode);
          console.error("Error Message:", error.message);
          
          // More specific error details
          if (error.errorCode === 'INVALID_LOGIN') {
              console.error("🔍 INVALID_LOGIN: Check username/password/security token");
          }
          
          // Log the full error object for debugging
          console.error("Full Error Object:", JSON.stringify(error, null, 2));
        
        // throw new Error(`Salesforce Authentication Failed: ${error.message}`);
          return { error: true, message: error?.message ?? 'Unknown error' };
      }
}

// buildFetchURL - encode the SOQL query portion
export function buildFetchURL(cond = [], limit = 10, offset = 0) {
  const condition = cond.length > 0 ? ` AND ${cond}` : '';
  const condHaveValues = cond.length > 0 ? true : false;
  const additionalquery = !condHaveValues ? `ORDER BY CreatedDate DESC LIMIT ${limit} OFFSET ${offset}` : '';

  const soql = `SELECT Id, Name, Hospital__r.name, Hospital__r.Id, Scrapper_Url__c, Scrapper_Employement_Type__c, Scrapper_Job_Title__c, Scrapper_Job_Type__c, Scrapper_Location__c, Scrapper_Req_Number__c, Scrapper_Work_Schedule__c, Salary_Range__c, Scrapper_Department__c, Job_Description__c, State__c, City__c, Scrapper_Format_Date__c, CreatedDate FROM Job__c WHERE Scrapper_Url__c != null ${condition} ${additionalquery}`;

  return `services/data/v64.0/query?q=${encodeURIComponent(soql)}`;
}

export function totalCountQuery() {
  const soql = `SELECT COUNT() FROM Job__c WHERE Scrapper_Url__c != null`;
  return `services/data/v64.0/query?q=${encodeURIComponent(soql)}`;
}

export async function fetchAllSalesforceJobs(initialUrl) {
  let allRecords = [];
  let nextUrl = initialUrl;

  while (nextUrl) {
    const response = await commonApiCallingMethod(nextUrl);

    const records = response?.records || [];
    allRecords.push(...records);

    // Salesforce pagination cursor
    nextUrl = response?.nextRecordsUrl
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${response.nextRecordsUrl}`
      : null;
  }

  return allRecords;
}