// src/app/job-detail/[jobId]/page.tsx
import React from "react";
import axiosInstance from "../../../lib/axiosInstance";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  params: { jobId: string } | Promise<{ jobId: string }>;
};

async function getJob(jobId: string) {
  const res = await axiosInstance.get("/api/getJobById", {
    params: { id: jobId },
  });

  if (res.data.success) {
    return res.data.jobs[0];
  } else {
    throw new Error("Failed to fetch job details " + res.data.message);
  }
}

const JobDetailPage = async ({ params }: Props) => {
  // **Important**: params is a Promise in this Next setup — await it
  const { jobId } = await params;

  const job = await getJob(jobId);

  const formatDate = (dateString: string): string => {
    const [month, day, year] = dateString.split("/");

    const date = new Date(`${year}-${month}-${day}`);

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };

    return date.toLocaleDateString("en-GB", options).replace(/ /g, "-");
  };

  if (!job) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <main className="max-w-4xl mx-auto py-8">
                        <h1 className="text-2xl font-bold mb-2">Job not found</h1>
                    </main>
                </div>
            </div>
            <Footer />
        </div>    
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                <main className="max-w-5xl mx-auto py-12 px-4 lg:px-0">
                    {/* Back link */}
                    <div className="mb-8">
                        <a
                        href="/jobs"
                        className="inline-flex items-center text-base font-medium text-blue-700 hover:text-blue-900 hover:underline transition"
                        >
                        ← Back to Job Search
                        </a>
                    </div>

                    {/* Header card */}
                    <section className="bg-white border border-slate-200 rounded-xl shadow-sm mb-8 p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">
                            {job.Scrapper_Job_Title__c}
                            </h1>

                            {(job?.Hospital__r?.Name) && (
                            <p className="mt-1 text-sm text-slate-500">
                                {job?.Hospital__r?.Name}
                                {job?.Hospital__r?.Name && ((job.City__c && job.State__c) || job.Scrapper_Location__c) && " • "}
                                { (job.City__c && job.State__c) ? job.City__c+', '+job.State__c : job.Scrapper_Location__c}
                            </p>
                            )}
                        </div>

                        {job.Scrapper_Url__c && (
                            <a
                            href={job.Scrapper_Url__c}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                            Apply Now
                            </a>
                        )}
                        </div>
                    </section>

                    {/* Job Details Section */}
                    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8">
                        <h2 className="text-lg font-semibold text-slate-900 mb-6">
                        Job Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-[180px,1fr] gap-y-4 gap-x-10 text-sm md:text-[15px]">
                        {job.Scrapper_Job_Title__c && (
                            <>
                            <div className="font-medium text-slate-600">Job Title</div>
                            <div className="text-slate-900">{job.Scrapper_Job_Title__c}</div>
                            </>
                        )}

                        {((job.City__c && job.State__c) || job.Scrapper_Location__c) && (
                            <>
                            <div className="font-medium text-slate-600">Location</div>
                            <div className="text-slate-900">{(job.City__c && job.State__c) ? job.City__c+', '+job.State__c: job.Scrapper_Location__c}</div>
                            </>
                        )}

                        {job.Scrapper_Employement_Type__c && (
                            <>
                            <div className="font-medium text-slate-600">Employment Type</div>
                            <div className="text-slate-900">{job.Scrapper_Employement_Type__c}</div>
                            </>
                        )}

                        {job.Scrapper_Department__c && (
                            <>
                            <div className="font-medium text-slate-600">Department</div>
                            <div className="text-slate-900">{job.Scrapper_Department__c}</div>
                            </>
                        )}

                        {job.Scrapper_Req_Number__c && (
                            <>
                            <div className="font-medium text-slate-600">Req Number</div>
                            <div className="text-slate-900">{job.Scrapper_Req_Number__c}</div>
                            </>
                        )}

                        {job.Scrapper_Format_Date__c && (
                            <>
                            <div className="font-medium text-slate-600">Date Posted</div>
                            <div className="text-slate-900">{formatDate(job.Scrapper_Format_Date__c)}</div>
                            </>
                        )}
                        </div>

                        {/* Description */}
                        {job.Job_Description__c && (
                        <div className="mt-8 border-t border-slate-200 pt-6">
                            <h3 className="text-sm font-semibold text-slate-900 mb-3">
                            Job Description
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                            {job.Job_Description__c}
                            </p>
                        </div>
                        )}
                    </section>

                    {/* Bottom CTA */}
                    {job.Scrapper_Url__c && (
                        <div className="mt-12 text-center">
                        <a
                            href={job.Scrapper_Url__c}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-blue-700 hover:text-blue-900 hover:underline transition"
                        >
                            Apply for the {job.Scrapper_Job_Title__c} position →
                        </a>
                        </div>
                    )}
                </main>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default JobDetailPage;
