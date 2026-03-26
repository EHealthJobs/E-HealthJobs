import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "TERMS OF SERVICE | E-Health Jobs",
  robots: "noindex, nofollow",
};

// ─── Brand constants ──────────────────────────────────────────────────────────
const BRAND = {
  navy:   "#00285A",
  yellow: "#FABE0A",
  blue:   "#0F78C3"
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TermsOfServicePage() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="tos-page">

        {/* ── Header ── */}
        <Navbar />

        {/* ── Hero ── */}
        <div className="tos-hero">
          <div className="tos-hero-inner">
            <h1 className="tos-hero-title">TERMS OF SERVICE</h1>
            <p className="tos-hero-sub">Contact Form · E-Health Jobs Inc.</p>
            <span className="tos-hero-badge">Last updated: March 19, 2026</span>
          </div>
        </div>

        {/* ── Card ── */}
        <main className="tos-main">
          <div className="tos-card">

            {/* Intro bar — mirrors bordered table in the doc */}
            <div className="tos-intro">
              <em>
                Please read these Terms of Service carefully before submitting
                information through any form on e-healthjobs.com, operated by{" "}
                <strong>E-Health Jobs Inc.</strong>, registered in North Carolina
                (Buncombe County). By submitting the form, you confirm you have read,
                understood, and agree to be bound by these Terms.
              </em>
            </div>

            <Section title="Website Offering and Acceptance of Terms">
              <p>
                This website is owned and operated by E-Health Jobs Inc., registered
                in North Carolina, Buncombe County, USA. These Terms set forth the
                terms and conditions under which you may use our website and services
                as offered by us. This website offers visitors Healthcare Recruitment
                Services, Coaching Services, and a Job Board Service. By accessing or
                using our website, you approve that you have read, understood, and
                agree to be bound by our Terms.
              </p>
            </Section>

            <Section title="About E-Health Jobs Inc.">
              <p>
                E-Health Jobs Inc. is a global healthcare recruitment company dedicated
                to connecting qualified healthcare professionals with the right
                opportunities — helping them advance their careers and find long-term,
                fulfilling placements at U.S. healthcare facilities.
              </p>

              <h3 className="tos-sub-heading">For Healthcare Employers</h3>
              <p>
                We partner with hospitals, health systems, and healthcare organizations
                across the U.S. to recruit and place qualified international and
                domestic healthcare professionals. Our services help facilities reduce
                reliance on costly travel staff and build stable, long-term permanent
                teams.
              </p>

              <h3 className="tos-sub-heading">For Healthcare Professionals</h3>
              <p>
                We work directly with nurses, allied health providers, and other
                healthcare candidates to match them with the right positions —
                supporting career growth and long-term success. Our team guides
                candidates through every step, including credentialing, visa
                sponsorship, immigration coordination, and relocation.
              </p>

              <h3 className="tos-sub-heading">Using Our Website and Forms</h3>
              <p>
                Our website and contact forms are available to any employer or
                healthcare professional who wishes to explore our services. By
                submitting any form on this website, you confirm that the information
                you provide is accurate and that doing so is not prohibited under any
                applicable law or regulation in your country or jurisdiction.
              </p>
            </Section>

            <Section title="Nature of the Consultation">
              <p>
                Submitting the form requests a free, 30-minute introductory
                consultation with an E-Health Jobs Inc. representative. This
                consultation is:
              </p>
              <ul>
                <li>
                  Informational in nature — it does not constitute a contract,
                  commitment, or guarantee of services
                </li>
                <li>
                  Not a binding proposal or offer of employment for any candidate
                  or nurse
                </li>
                <li>
                  Subject to E-Health Jobs Inc.&apos;s availability and right to
                  schedule or decline
                </li>
              </ul>
              <p>
                Any formal engagement of E-Health Jobs Inc. services will be governed
                by a separate written services agreement. Nothing in the consultation
                or on this website creates an employer-employee, agency, joint venture,
                or partnership relationship between E-Health Jobs Inc. and the
                submitting party.
              </p>
            </Section>

            <Section title="Accuracy of Information">
              <p>
                By submitting the consultation form, you represent and warrant that all
                information you provide is accurate, current, and complete; that you
                are authorized to submit such information; and that you will update any
                information that becomes inaccurate. E-Health Jobs Inc. reserves the
                right to refuse service or cancel a consultation if submitted
                information is found to be false, misleading, or unauthorized.
              </p>
            </Section>

            {/* ── SMS — special highlighted section matching doc ── */}
            <Section title="SMS / Text Message Terms">
              <div className="tos-sms-consent">
                <span className="tos-sms-label">SMS Opt-In</span>
                <p>
                  By checking the opt-in box on our contact form, you expressly
                  consent to receive recurring automated text messages from E-Health
                  Jobs Inc. — including appointment reminders and follow-up
                  communications — at the mobile number you provide.
                </p>
              </div>

              <div className="tos-sms-items">
                <div className="tos-sms-item">
                  <span className="tos-sms-num">1</span>
                  <div>
                    <strong>Message Frequency</strong>
                    <p>
                      Frequency will vary based on your consultation(s) and follow-up
                      activity.
                    </p>
                  </div>
                </div>
                <div className="tos-sms-item">
                  <span className="tos-sms-num">2</span>
                  <div>
                    <strong>Message &amp; Data Rates</strong>
                    <p>
                      Standard carrier rates may apply. E-Health Jobs Inc. is not
                      responsible for charges incurred from your carrier.
                    </p>
                  </div>
                </div>
                <div className="tos-sms-item">
                  <span className="tos-sms-num">3</span>
                  <div>
                    <strong>Opt-Out &amp; Help</strong>
                    <ul>
                      <li>
                        Reply <code>STOP</code> to any message to cancel. You will
                        receive one confirmation and no further texts.
                      </li>
                      <li>
                        Reply <code>HELP</code> to any message for assistance, or
                        contact us at{" "}
                        <a href="mailto:admin@e-healthglobal.us">
                          admin@e-healthglobal.us
                        </a>{" "}
                        or <a href="tel:+16465030970">+1 646-503-0970</a>.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="tos-sms-item">
                  <span className="tos-sms-num">4</span>
                  <div>
                    <strong>No Third-Party Sharing</strong>
                    <p>
                      Your phone number will not be shared with third parties for
                      their own marketing or solicitation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tos-important">
                <strong>IMPORTANT:</strong>{" "}
                <em>
                  Consent to receive SMS is not a condition of receiving our services.
                  Carrier availability may vary — E-Health Jobs Inc. is not liable for
                  delayed or undelivered messages.
                </em>
              </div>
            </Section>

            <Section title="Intellectual Property">
              <p>
                The Service and all materials therein or transferred thereby,
                including, without limitation, software, images, text, graphics,
                logos, patents, trademarks, service marks, copyrights, photographs,
                audio, videos, music and all Intellectual Property Rights related
                thereto, are the exclusive property of E-Health Jobs Inc. Except as
                explicitly provided herein, nothing in these Terms shall be deemed to
                create a license in or under any such Intellectual Property Rights, and
                you agree not to sell, license, rent, modify, distribute, copy,
                reproduce, transmit, publicly display, publicly perform, publish,
                adapt, edit or create derivative works thereof. E-Health Jobs Inc. has
                been in business and using its IP, Copyrights, Business Name and Logo
                since 2007.
              </p>
            </Section>

            <Section title="Disclaimer of Warranties">
              <p>
                The website and its content are provided on an &quot;AS IS&quot; and
                &quot;AS AVAILABLE&quot; basis, without warranties of any kind —
                express or implied — including warranties of merchantability, fitness
                for a particular purpose, or non-infringement. Case study figures and
                statistical outcomes represent past results under specific conditions
                and are not guarantees of future performance.
              </p>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, E-Health Jobs Inc.
                assumes no liability or responsibility for any (i) errors, mistakes,
                or inaccuracies of content; (ii) personal injury or property damage,
                of any nature whatsoever, resulting from your access to or use of our
                service; and (iii) any unauthorized access to or use of our secure
                servers and/or any and all personal information stored therein.
                Specific liability limits, where applicable, are outlined in any
                separate service agreement between E-Health Jobs Inc. and the client.
              </p>
            </Section>

            <Section title="Indemnification">
              <p>
                You agree to indemnify and hold E-Health Jobs Inc. harmless from any
                demands, loss, liability, claims or expenses (including attorneys&apos;
                fees), made against them by any third party due to, or arising out of,
                or in connection with your use of the website or any of the services
                offered on the website.
              </p>
            </Section>

            <Section title="Right to Suspend or Cancel Account">
              <p>
                We may permanently or temporarily terminate or suspend your access to
                the service without notice and liability for any reason, including if
                in our sole determination you violate any provision of these Terms or
                any applicable law or regulations. You may discontinue use and request
                to cancel your account and/or any services at any time.
              </p>
            </Section>

            <Section title="Right to Change Offering">
              <p>
                We may, without prior notice, change the services; stop providing the
                services or any features of the services we offer; or create limits for
                the services. We may permanently or temporarily terminate or suspend
                access to the services without notice and liability for any reason, or
                for no reason.
              </p>
            </Section>

            <Section title="User Rights">
              <p>
                You have the right to contact us at any time for access to your
                account, or ask that your information be updated or deleted from our
                system. Email{" "}
                <a href="mailto:admin@e-healthglobal.us">admin@e-healthglobal.us</a>{" "}
                or call <a href="tel:+16465030970">+1 646-503-0970</a> with your
                request.
              </p>
            </Section>

            <Section title="Promotional Communications">
              <p>
                You agree to receive from time to time promotional messages and
                materials from us, by mail, email or any other contact form you may
                provide us with (including your phone number for calls or text
                messages). If you don&apos;t want to receive such promotional materials
                or notices, please notify us at any time at{" "}
                <a href="mailto:admin@e-healthglobal.us">admin@e-healthglobal.us</a>{" "}
                or +1 646-503-0970.
              </p>
            </Section>

            <Section title="Dispute Resolution">
              <p>
                These Terms, the rights and remedies provided hereunder, and any and
                all claims and disputes related hereto and/or to the services, shall be
                governed by, construed under and enforced in all respects solely and
                exclusively in accordance with the internal substantive laws of North
                Carolina, USA, without respect to its conflict of laws principles. Any
                and all such claims and disputes shall be brought in, and you hereby
                consent to them being decided exclusively by a court of competent
                jurisdiction located in Buncombe County, North Carolina.
              </p>
            </Section>

            <Section title="Right to Modify Terms">
              <p>
                We reserve the right to modify these terms from time to time at our
                sole discretion. When we change the Terms in a material manner, we will
                notify you that material changes have been made. Your continued use of
                the website or our service after any such change constitutes your
                acceptance of the new Terms.
              </p>
            </Section>

            <Section title="Contact &amp; Legal Inquiries">
              <div className="tos-contact-table-wrap">
                <table className="tos-contact-table">
                  <tbody>
                    {[
                      ["Company",          "E-Health Jobs Inc."],
                      ["Registered In",    "North Carolina, Buncombe County, USA"],
                      ["Email",            <a href="mailto:admin@e-healthglobal.us">admin@e-healthglobal.us</a>],
                      ["Phone",            <a href="tel:+16465030970">+1 646-503-0970</a>],
                      ["Website",          <a href="https://www.e-healthjobs.com" target="_blank" rel="noopener noreferrer">www.e-healthjobs.com</a>],
                      ["Legal Questions",  <><a href="mailto:admin@e-healthglobal.us">admin@e-healthglobal.us</a> — Terms clarifications &amp; service inquiries</>],
                      ["SMS Opt-Out",      <>Reply <code>STOP</code> to any text message, or email <a href="mailto:admin@e-healthglobal.us">admin@e-healthglobal.us</a></>],
                    ].map(([label, value]) => (
                      <tr key={String(label)}>
                        <td className="tos-ct-label">{label}</td>
                        <td className="tos-ct-value">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Form submission checklist — unique to ToS */}
            <Section title="Form Submission Checklist">
              <div className="tos-checklist">
                {[
                  "Confirm you are submitting accurate and current contact information",
                  "Review SMS opt-in preference — check the box only if you consent to text reminders",
                  "Understand that form submission initiates a consultation or inquiry, not a binding engagement",
                  "Confirm that submitting this information is not prohibited under any applicable law or regulation",
                  "Confirm you have read and agree to these Terms of Service and our Privacy Policy",
                ].map((item, i) => (
                  <div className="tos-checklist-item" key={i}>
                    <span className="tos-checklist-num">{i + 1}</span>
                    <span className="tos-checklist-text">{item}</span>
                  </div>
                ))}
              </div>
            </Section>

          </div>{/* /card */}
        </main>

        {/* ── Footer ── */}
        <Footer />

      </div>
    </>
  );
}

// ─── Section helper ───────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <section className="tos-section">
      <h2 className="tos-section-title">{title}</h2>
      <div className="tos-section-body">{children}</div>
    </section>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* Page */
  .tos-page {
    min-height: 100vh;
    background: #f4f6f9;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    color: #1a1a2e;
  }

  /* Header */
  .tos-header {
    background: #ffffff;
    border-bottom: 3px solid #FABE0A;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .tos-header-inner {
    max-width: 1140px;
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  .tos-logo { height: 52px; width: auto; display: block; }
  .tos-nav { display: flex; gap: 28px; flex-wrap: wrap; }
  .tos-nav a {
    font-size: 14px;
    font-weight: 500;
    color: #00285A;
    text-decoration: none;
    transition: color 0.15s;
  }
  .tos-nav a:hover { color: #0F78C3; }

  /* Hero */
  .tos-hero {
    background: #00285A;
    padding: 95px 24px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .tos-hero::after {
    content: "";
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 4px;
    background: #FABE0A;
  }
  .tos-hero-inner { max-width: 720px; margin: 0 auto; }
  .tos-hero-title {
    font-size: clamp(30px, 5vw, 46px);
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }
  .tos-hero-sub { font-size: 16px; color: #a8c8e8; margin-bottom: 16px; }
  .tos-hero-badge {
    display: inline-block;
    background: #FABE0A;
    color: #00285A;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 14px;
    border-radius: 20px;
    letter-spacing: 0.04em;
  }

  /* Main */
  .tos-main {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px 64px;
  }
  .tos-card {
    background: #ffffff;
    border-radius: 12px;
    padding: clamp(28px, 5vw, 52px);
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 24px rgba(0,40,90,0.08);
  }

  /* Intro banner */
  .tos-intro {
    background: #EEF5FB;
    border-left: 4px solid #0F78C3;
    border-radius: 0 8px 8px 0;
    padding: 16px 20px;
    margin-bottom: 40px;
    font-size: 14px;
    line-height: 1.7;
    color: #00285A;
  }

  /* Sections */
  .tos-section {
    margin-bottom: 36px;
    padding-bottom: 36px;
    border-bottom: 1px solid #eef0f4;
  }
  .tos-section:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .tos-section-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #00285A;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 2px solid #FABE0A;
    display: inline-block;
  }
  .tos-section-body p {
    font-size: 15px;
    line-height: 1.8;
    color: #374151;
    margin-bottom: 12px;
  }
  .tos-section-body p:last-child { margin-bottom: 0; }
  .tos-section-body ul { padding-left: 20px; margin-bottom: 12px; }
  .tos-section-body li {
    font-size: 15px;
    line-height: 1.8;
    color: #374151;
    margin-bottom: 6px;
  }
  .tos-section-body li::marker { color: #0F78C3; }
  .tos-section-body a {
    color: #0F78C3;
    text-decoration: none;
    border-bottom: 1px solid #b3d9f0;
    transition: color 0.15s;
  }
  .tos-section-body a:hover { color: #00285A; }
  .tos-section-body code {
    background: #f0f4f8;
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 13px;
    color: #00285A;
    font-family: "SF Mono", "Fira Code", monospace;
  }
  .tos-section-body strong { color: #00285A; }

  /* Sub-headings */
  .tos-sub-heading {
    font-size: 14px;
    font-weight: 700;
    color: #00285A;
    margin: 20px 0 8px;
  }

  /* SMS consent box */
  .tos-sms-consent {
    background: #EEF5FB;
    border: 1px solid #bdd9f0;
    border-radius: 8px;
    padding: 18px 20px;
    margin-bottom: 20px;
  }
  .tos-sms-label {
    display: inline-block;
    background: #0F78C3;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .tos-sms-consent p { font-size: 14px; line-height: 1.7; color: #00285A; margin: 0; }

  /* SMS numbered items */
  .tos-sms-items { display: flex; flex-direction: column; gap: 14px; margin-bottom: 16px; }
  .tos-sms-item {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 14px 16px;
  }
  .tos-sms-num {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #00285A;
    color: #FABE0A;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
  }
  .tos-sms-item strong { font-size: 14px; color: #00285A; display: block; margin-bottom: 4px; }
  .tos-sms-item p { font-size: 14px; line-height: 1.6; color: #374151; margin: 0; }
  .tos-sms-item ul { padding-left: 18px; margin: 4px 0 0; }
  .tos-sms-item li { font-size: 14px; line-height: 1.7; color: #374151; margin-bottom: 4px; }

  /* Important box */
  .tos-important {
    background: #FFFBEA;
    border: 1px solid #FABE0A;
    border-left: 4px solid #FABE0A;
    border-radius: 0 8px 8px 0;
    padding: 14px 18px;
    margin: 4px 0 0;
    font-size: 14px;
    line-height: 1.7;
    color: #4a3500;
  }

  /* Contact table */
  .tos-contact-table-wrap {
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }
  .tos-contact-table { width: 100%; border-collapse: collapse; font-size: 14px; }
  .tos-contact-table tr { border-bottom: 1px solid #f0f2f5; }
  .tos-contact-table tr:last-child { border-bottom: none; }
  .tos-ct-label {
    padding: 13px 18px;
    font-weight: 700;
    color: #00285A;
    background: #F5F8FC;
    white-space: nowrap;
    width: 190px;
    vertical-align: top;
    border-right: 1px solid #e2e8f0;
  }
  .tos-ct-value { padding: 13px 18px; color: #374151; line-height: 1.6; }

  /* Checklist */
  .tos-checklist { display: flex; flex-direction: column; gap: 10px; }
  .tos-checklist-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 14px 16px;
  }
  .tos-checklist-num {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #FABE0A;
    color: #00285A;
    font-size: 13px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tos-checklist-text { font-size: 14px; line-height: 1.7; color: #374151; padding-top: 3px; }

  /* Footer */
  .tos-footer {
    background: #00285A;
    border-top: 4px solid #FABE0A;
    padding: 28px 24px;
  }
  .tos-footer-inner {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .tos-footer-logo {
    height: 36px;
    width: auto;
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }
  .tos-footer p { font-size: 13px; color: #a8c8e8; text-align: center; }
  .tos-footer a { color: #FABE0A; text-decoration: none; }
  .tos-footer a:hover { text-decoration: underline; }

  @media (max-width: 640px) {
    .tos-nav { display: none; }
    .tos-ct-label { width: 120px; font-size: 12px; }
    .tos-ct-value { font-size: 13px; }
    .tos-sms-item { flex-direction: column; gap: 8px; }
  }
`;