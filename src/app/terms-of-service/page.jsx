import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-[15px] leading-7">

      {/* HEADER */}
      <Navbar />
      <div className="bg-[#00285A] text-white text-center pt-[6.5rem] pb-[1.5rem]">
        <h1 className="text-2xl font-bold">
          TERMS OF SERVICE
        </h1>

        <p className="text-[#FABE0A]">
          Contact Form | E-Health Jobs Inc.
        </p>
      </div>


      {/* SUB HEADER */}
      <div className="text-center py-4 border-b border-[#FABE0A]">

        <p>
          Please read these Terms of Service carefully before submitting
          information through any form on e-healthjobs.com,
          operated by <b>E-Health Jobs Inc.</b>, registered in North Carolina
          (Buncombe County).
        </p>

        <p className="text-[#0F78C3] mt-2">
          Last updated: March 19, 2026
        </p>

      </div>



      <div className="max-w-5xl mx-auto px-8 py-8">


        <Section title="WEBSITE OFFERING AND ACCEPTANCE OF TERMS">
          This website is owned and operated by E-Health Jobs Inc.,
          registered in North Carolina, Buncombe County, USA.

          By accessing or using our website, you agree to be bound
          by these Terms.
        </Section>


        <Section title="ABOUT E-HEALTH JOBS INC.">
          E-Health Jobs Inc. is a global healthcare recruitment company
          connecting qualified healthcare professionals with opportunities
          at U.S. healthcare facilities.
        </Section>


        <Section title="FOR HEALTHCARE EMPLOYERS">
          We partner with hospitals and healthcare organizations across
          the U.S. to recruit qualified professionals and build long-term teams.
        </Section>


        <Section title="FOR HEALTHCARE PROFESSIONALS">
          We work directly with nurses and healthcare providers and
          guide them through credentialing, visa sponsorship,
          immigration, and relocation.
        </Section>


        <Section title="USING OUR WEBSITE AND FORMS">
          By submitting any form, you confirm the information you provide
          is accurate and allowed by law.
        </Section>


        <Section title="NATURE OF THE CONSULTATION">

          <ol className="list-decimal ml-6">
            <li>Consultation is informational only</li>
            <li>Not a contract or job offer</li>
            <li>Subject to scheduling availability</li>
          </ol>

        </Section>


        <Section title="ACCURACY OF INFORMATION">
          All submitted information must be accurate.
          E-Health Jobs Inc. may refuse service if information is false.
        </Section>



        <Section title="SMS / TEXT MESSAGE TERMS">

          <ol className="list-decimal ml-6">
            <li>Message frequency varies</li>
            <li>Carrier rates may apply</li>
            <li>Reply STOP to opt-out</li>
            <li>No third-party sharing</li>
          </ol>

          <br />

          admin@e-healthglobal.us  
          +1 646-503-0970

        </Section>



        <Section title="INTELLECTUAL PROPERTY">
          All content, logos, text, and materials belong to
          E-Health Jobs Inc. and may not be copied or distributed.
        </Section>


        <Section title="DISCLAIMER OF WARRANTIES">
          Website is provided "AS IS" without guarantees.
        </Section>


        <Section title="LIMITATION OF LIABILITY">
          E-Health Jobs Inc. is not responsible for damages
          caused by use of the website.
        </Section>


        <Section title="INDEMNIFICATION">
          You agree to hold E-Health Jobs Inc. harmless
          from claims related to website use.
        </Section>


        <Section title="RIGHT TO SUSPEND OR CANCEL ACCOUNT">
          We may suspend or terminate access at any time.
        </Section>


        <Section title="RIGHT TO CHANGE OFFERING">
          Services may change without notice.
        </Section>


        <Section title="USER RIGHTS">
          admin@e-healthglobal.us  
          +1 646-503-0970
        </Section>


        <Section title="PROMOTIONAL COMMUNICATIONS">
          You may receive messages unless you opt-out.
        </Section>


        <Section title="DISPUTE RESOLUTION">
          Governed by laws of North Carolina, USA.
        </Section>


        <Section title="RIGHT TO MODIFY TERMS">
          Terms may change at any time.
        </Section>



        <Section title="CONTACT & LEGAL INQUIRIES">

          E-Health Jobs Inc. <br />
          North Carolina, Buncombe County, USA <br />
          admin@e-healthglobal.us <br />
          +1 646-503-0970 <br />
          www.e-healthjobs.com

        </Section>



        <Section title="FORM SUBMISSION CHECKLIST">

          <ol className="list-decimal ml-6">
            <li>Confirm information is correct</li>
            <li>Review SMS opt-in</li>
            <li>Understand consultation only</li>
            <li>Confirm legal submission</li>
            <li>Agree to Terms & Privacy Policy</li>
          </ol>

        </Section>



      </div>


      {/* FOOTER */}
      {/* <div className="bg-[#00285A] text-white text-center py-4 text-sm">
        E-Health Jobs Inc. | admin@e-healthglobal.us |
        +1 646-503-0970 | Buncombe County, NC | © 2026
      </div> */}
      <Footer />

    </div>
  );
}



function Section({ title, children }) {
  return (
    <div className="mt-7">

      <h3 className="text-[#00285A] font-bold border-l-4 border-[#FABE0A] pl-3 mb-2">
        {title}
      </h3>

      <div>{children}</div>

    </div>
  );
}