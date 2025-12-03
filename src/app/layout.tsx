'use client';

import "../index.css";
import Providers from "./providers";
import { Playfair_Display, Inter } from "next/font/google"; // import Google fonts
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";


// Load fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// export const metadata = {
//   title: "eHealthJOBS - Global Healthcare Recruitment Solutions",
//   icons: {
//     icon: "https://static.wixstatic.com/media/790a51_606f3f9208aa404bbf8268164deecdb3~mv2.png/v1/fill/w_670,h_274,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/790a51_606f3f9208aa404bbf8268164deecdb3~mv2.png",
//   },
//   description:
//     "Transform your healthcare staffing with zero travelers. Save millions with our global recruitment solutions for nurses and allied health professionals.",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();           // returns { jobId: '...' } in client
  const jobId = params?.jobId ?? null;
  const [structuredData, setStructuredData] = useState<any>({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "eHealthJOBS",
        "url": "https://e-healthjobs.com",
        "logo": "https://e-healthjobs.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/yourpage",
          "https://twitter.com/yourhandle",
          "https://www.linkedin.com/company/yourcompany"
        ]
      },
      {
        "@type": "WebSite",
        "url": "https://e-healthjobs.com/",
        "name": "eHealthJOBS",
        "description": "eHealthJOBS Global recruitment solutions for healthcare professionals.",
        "publisher": {
          "@id": "https://e-healthjobs.com/#home"
        }
      }
    ]
  });  
  const [jobUrl, setJobUrl] = useState('');
  const today = new Date();
  const plus5Days = new Date(today);
  plus5Days.setDate(today.getDate() + 5);

  const validThrough = plus5Days.toISOString().split('T')[0];
  useEffect(() => {
    if (!jobId) return;

    function getJobById(jobId: string) {
      return axiosInstance.get("/api/getJobById", {
        params: { id: jobId }
      });
    }

    getJobById(jobId).then((res) => {
      const apiJob = res.data.jobs[0];
        
        setStructuredData({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: apiJob?.Name ?? "",
          description: apiJob?.Job_Description__c ?? "",
          identifier: {
            "@type": "PropertyValue",
            name: "eHealthJOBS",
            value: apiJob?.Id ?? "",
          },
          datePosted: apiJob?.Scrapper_Format_Date__c ?? "",
          validThrough: validThrough,
          employmentType: apiJob?.Scrapper_Employement_Type__c ?? "",
          hiringOrganization: {
            "@type": "Organization",
            name: "eHealthJOBS",
            sameAs: "https://e-healthjobs.com",
            logo: "https://e-healthjobs.com/logo.png",
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: apiJob?.City__c ?? "",
              addressState: apiJob?.State__c ?? "",
            },
          },
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: {
              "@type": "QuantitativeValue",
              value: apiJob?.Salary_Range__c ?? "",
              unitText: "HOUR",
            },
          },
        });
        setJobUrl(`https://e-healthjobs.com/job-detail/${jobId}`); 
    }).catch((err) => console.error("Error:", err));
  }, [jobId]);
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <title>Home | eHealthJOBS</title>
        {jobUrl && <link rel="canonical" href={jobUrl} />}
        <meta name="description" content="With almost 2 decades in business, we've saved smart hospitals millions as they transition to their ZERO travelers goal quickly and cost effectively." />

        <meta name="keywords" content="jobs, healthcare, usa, nurses, immigration, hiring" />
        <meta name="author" content="eHealthJOBS" />

        <meta property="og:title" content="eHealthJOBS - Global recruitment solutions for healthcare professionals" />
        <meta property="og:description" content="Step-by-step guidance for nurses & health workers to get hired in the US." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="../images/image.avif" />
        <meta property="og:url" content="https://e-healthjobs.com" />
        {/* <meta name="google-site-verification" content="f8ids8YdEBlCMaCvyHEy0U0H3xbuc2G2rA513GhJREo" />
        <meta name="google-site-verification" content="AFegsxJynb8N1XQgr6OfHdB7wLp3V9K1CA3JM5wLR7E" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="eHealthJOBS" />
        <meta name="twitter:description" content="With almost 2 decades in business, we've saved smart hospitals millions as they transition to their ZERO travelers goal quickly and cost effectively." />
        <meta name="twitter:image" content="/seo-banner.jpg" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {structuredData && <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        /> }
      </head>
      <body className="bg-white text-black font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
