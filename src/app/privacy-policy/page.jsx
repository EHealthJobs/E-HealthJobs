// PrivacyPolicy.tsx
// Place at: app/privacy-policy/page.tsx  (App Router)
//        or: pages/privacy-policy.tsx    (Pages Router)
// Only accessible via links on the contact form — not in nav, robots noindex.

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PRIVACY POLICY | E-Health Jobs",
  robots: "noindex, nofollow",
};

// ─── Brand constants ──────────────────────────────────────────────────────────
const BRAND = {
  navy:   "#00285A",
  yellow: "#FABE0A",
  blue:   "#0F78C3",
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="pp-page">

        {/* ── Header ── */}
        <Navbar />

        {/* ── Hero ── */}
        <div className="pp-hero">
          <div className="pp-hero-inner">
            <h1 className="pp-hero-title">PRIVACY POLICY</h1>
            <p className="pp-hero-sub">Contact Form · E-Health Jobs Inc.</p>
            <span className="pp-hero-badge">Last updated: March 19, 2026</span>
          </div>
        </div>

        {/* ── Card ── */}
        <main className="pp-main">
          <div className="pp-card">

            {/* Intro bar — matches the bordered table in the doc */}
            <div className="pp-intro">
              <em>
                This Privacy Policy applies to information collected by{" "}
                <strong>E-Health Jobs Inc.</strong>, registered in North Carolina
                (Buncombe County). By using our site, you agree to the terms below.
              </em>
            </div>

            <Section title="Introduction">
              <p>
                E-Health Jobs Inc. is in the business of sourcing, recruiting, and
                matching potential job candidates with potential employers. We collect
                information from you with your express permission in order to help you
                secure a position of your choice. Please do not use our site if you do
                not agree with the terms below.
              </p>
            </Section>

            <Section title="Type of Information We Collect">
              <p>
                We receive, collect and store any information you enter on our website
                or provide us in any other way. This includes personally identifiable
                information such as your name, email address, password, phone number,
                and any communications, comments, feedback, or profile information you
                submit.
              </p>
              <p>
                Our website is hosted on Amazon Web Services (AWS). Like most web hosting
                services, AWS may automatically log basic technical data such as IP
                addresses and browser information as part of standard server
                operations. We do not directly collect or analyze this data for
                marketing purposes.
              </p>
              <p>
                We collect mobile phone numbers to communicate with you (call or SMS)
                if you choose to book an appointment with us.
              </p>
            </Section>

            <Section title="How We Collect Information">
              <p>
                When you apply to a job on our website, we collect personal information
                you give us such as your name, address, home phone number or mobile
                phone number and email address. Your personal information will be used
                for the specific reasons stated above only.{" "}
                <strong>Your information is never shared or sold.</strong>
              </p>
            </Section>

            <Section title="We Collect & Store Information for the Following Purposes">
              <ul>
                <li>To provide and operate our Business and fulfill our Services</li>
                <li>
                  To provide our Users with ongoing customer assistance and technical
                  support
                </li>
                <li>
                  To be able to contact our Visitors and Users with general or
                  personalized service-related notices and promotional messages
                </li>
                <li>
                  To create aggregated statistical data and other aggregated and/or
                  inferred Non-personal Information, which we or our business partners
                  may use to provide and improve our respective services
                </li>
                <li>To comply with any applicable laws and regulations</li>
              </ul>
            </Section>

            <Section title="Consent">
              <p>
                Information obtained from you through this website (Name, Address,
                Email, Phone Number) is consent for us to use that information for the
                fulfillment of our services to you only. We do not sell, rent or share
                your information with any third party for marketing purposes.
              </p>
            </Section>

            {/* ── SMS — special highlighted section matching doc ── */}
            <Section title="SMS Communications Policy">
              <div className="pp-sms-consent">
                <span className="pp-sms-label">SMS Consent</span>
                <p>
                  By providing your mobile phone number to E-Health Jobs Inc., you
                  consent to receive recurring SMS/text messages from us, including
                  but not limited to appointment reminders, updates, alerts, and other
                  communications related to our recruitment services. Consent is not a
                  condition of purchase. Message and data rates may apply. Message
                  frequency may vary.
                </p>
              </div>

              <h3 className="pp-sub-heading">How We Use Your Mobile Number</h3>
              <p>
                We use your mobile number exclusively for the purposes outlined above. We do not sell, share, or disclose your mobile phone number to any third parties for their own marketing or solicitation purposes. Your phone number may only be shared with trusted technology vendors or delivery platforms strictly for the purpose of enabling SMS communications on our behalf — and those vendors are prohibited from using it for any other purpose.
              </p>

              <h3 className="pp-sub-heading">Opt-Out and Help</h3>
              <ul>
                <li>
                  <strong>Opt-Out:</strong> You can opt out of receiving SMS messages
                  from us at any time by replying <code>STOP</code> to any message you
                  receive.
                </li>
                <li>
                  <strong>Help:</strong> For help or additional support, reply{" "}
                  <code>HELP</code>, or contact us at{" "}
                  <a href="mailto:admin@e-healthglobal.us">admin@e-healthglobal.us</a>{" "}
                  or <a href="tel:+16465030970">+1 646-503-0970</a>.
                </li>
              </ul>

              <div className="pp-important">
                <strong>IMPORTANT:</strong>{" "}
                <em>
                  Your mobile phone number will never be sold, rented, or shared with any third parties or affiliates for marketing or solicitation purposes. Consent to receive SMS is not a condition of receiving our services.
                </em>
              </div>

              <h3 className="pp-sub-heading">Carrier Disclaimer</h3>
              <p>
                Please note that mobile carriers are not liable for delayed or
                undelivered messages. E-Health Jobs Inc. is not responsible for any
                charges you may incur from your carrier.
              </p>
            </Section>

            <Section title="Data Security Measures">
              <p>
                We take reasonable measures to protect your personal information,
                including your mobile number, from unauthorized access, disclosure, or
                misuse. Our website is hosted on Amazon Web Services (AWS). AWS
                provides us with the cloud infrastructure that allows us to deliver our
                services to you. Your data may be stored through AWS&apos;s data
                storage, databases and cloud applications. They store
                your data on secure servers with industry-standard security controls.
              </p>
            </Section>

            <Section title="Data Sharing Disclosure">
              <p>
                All communications and information shared with us remains confidential.
                We do not sell, rent or share any information with any third party,
                unless you give us explicit authorization to do so, and only for the
                purpose of fulfilling our services to you.
              </p>
            </Section>

            <Section title="How We Communicate With You">
              <p>
                We may contact you for purposes directly related to our recruitment
                services, including:
              </p>
              <ul>
                <li>
                  To provide updates on your job application or placement status
                </li>
                <li>To coordinate between candidates and employer partners</li>
                <li>
                  To notify you regarding your account or troubleshoot issues
                </li>
                <li>To send service-related updates and company news</li>
                <li>
                  To follow up on consultation requests or scheduled appointments
                </li>
                <li>
                  To comply with applicable laws and agreements we may have with you
                </li>
              </ul>
              <p>
                For these purposes we may contact you via email, telephone, text messages, or postal mail. We will not contact you for purposes unrelated to our recruitment services without your consent.
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

            <Section title="Privacy Policy Updates">
              <p>
                We reserve the right to modify this privacy policy at any time, so
                please review it frequently. Changes and clarifications will take
                effect immediately upon their posting on the website. If we make
                material changes to this policy, we will notify you here that it has
                been updated, so that you are aware of what information we collect,
                how we use it, and under what circumstances, if any, we use and/or
                disclose it.
              </p>
            </Section>

            <Section title="Contact Information">
              <div className="pp-contact-table-wrap">
                <table className="pp-contact-table">
                  <tbody>
                    {[
                      ["Company",           "E-Health Jobs Inc."],
                      ["Registered In",     "North Carolina, Buncombe County, USA"],
                      ["Email",             <a href="mailto:admin@e-healthglobal.us">admin@e-healthglobal.us</a>],
                      ["Phone",             <a href="tel:+16465030970">+1 646-503-0970</a>],
                      ["Website",           <a href="https://www.e-healthjobs.com" target="_blank" rel="noopener noreferrer">www.e-healthjobs.com</a>],
                      ["Privacy Questions", <><a href="mailto:admin@e-healthglobal.us">admin@e-healthglobal.us</a> — Data requests, opt-out &amp; privacy concerns</>],
                      ["SMS Opt-Out",       <>Reply <code>STOP</code> to any text message, or email <a href="mailto:admin@e-healthglobal.us">admin@e-healthglobal.us</a></>],
                    ].map(([label, value]) => (
                      <tr key={String(label)}>
                        <td className="pp-ct-label">{label}</td>
                        <td className="pp-ct-value">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

          </div>{/* /card */}
        </main>

        {/* ── Footer ── */}
        {/* <footer className="pp-footer">
          <div className="pp-footer-inner">
            <img src={BRAND.logo} alt="E-Health Jobs" className="pp-footer-logo" />
            <p>
              E-Health Jobs Inc. · Privacy Policy ·{" "}
              <a href="mailto:admin@e-healthglobal.us">admin@e-healthglobal.us</a> ·{" "}
              +1 646-503-0970 · © 2026
            </p>
          </div>
        </footer> */}
        <Footer />
      </div>
    </>
  );
}

// ─── Section helper ───────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <section className="pp-section">
      <h2 className="pp-section-title">{title}</h2>
      <div className="pp-section-body">{children}</div>
    </section>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* Page */
  .pp-page {
    min-height: 100vh;
    background: #f4f6f9;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    color: #1a1a2e;
  }

  /* Header */
  .pp-header {
    background: #ffffff;
    border-bottom: 3px solid #FABE0A;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .pp-header-inner {
    max-width: 1140px;
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  .pp-logo {
    height: 52px;
    width: auto;
    display: block;
  }
  .pp-nav {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
  }
  .pp-nav a {
    font-size: 14px;
    font-weight: 500;
    color: #00285A;
    text-decoration: none;
    transition: color 0.15s;
  }
  .pp-nav a:hover { color: #0F78C3; }

  /* Hero */
  .pp-hero {
    background: #00285A;
    padding: 95px 24px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .pp-hero::after {
    content: "";
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 4px;
    background: #FABE0A;
  }
  .pp-hero-inner { max-width: 720px; margin: 0 auto; }
  .pp-hero-title {
    font-size: clamp(30px, 5vw, 46px);
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }
  .pp-hero-sub {
    font-size: 16px;
    color: #a8c8e8;
    margin-bottom: 16px;
  }
  .pp-hero-badge {
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
  .pp-main {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px 64px;
  }
  .pp-card {
    background: #ffffff;
    border-radius: 12px;
    padding: clamp(28px, 5vw, 52px);
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 24px rgba(0,40,90,0.08);
  }

  /* Intro banner */
  .pp-intro {
    background: #EEF5FB;
    border-left: 4px solid #0F78C3;
    border-radius: 0 8px 8px 0;
    padding: 16px 20px;
    margin-bottom: 40px;
    font-size: 14px;
    line-height: 1.7;
    color: #00285A;
  }

  /* Section */
  .pp-section {
    margin-bottom: 36px;
    padding-bottom: 36px;
    border-bottom: 1px solid #eef0f4;
  }
  .pp-section:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .pp-section-title {
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
  .pp-section-body p {
    font-size: 15px;
    line-height: 1.8;
    color: #374151;
    margin-bottom: 12px;
  }
  .pp-section-body p:last-child { margin-bottom: 0; }
  .pp-section-body ul {
    padding-left: 20px;
    margin-bottom: 12px;
  }
  .pp-section-body li {
    font-size: 15px;
    line-height: 1.8;
    color: #374151;
    margin-bottom: 6px;
  }
  .pp-section-body li::marker { color: #0F78C3; }
  .pp-section-body a {
    color: #0F78C3;
    text-decoration: none;
    border-bottom: 1px solid #b3d9f0;
    transition: color 0.15s;
  }
  .pp-section-body a:hover { color: #00285A; }
  .pp-section-body code {
    background: #f0f4f8;
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 13px;
    color: #00285A;
    font-family: "SF Mono", "Fira Code", monospace;
  }

  /* SMS consent box */
  .pp-sms-consent {
    background: #EEF5FB;
    border: 1px solid #bdd9f0;
    border-radius: 8px;
    padding: 18px 20px;
    margin-bottom: 20px;
  }
  .pp-sms-label {
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
  .pp-sms-consent p {
    font-size: 14px;
    line-height: 1.7;
    color: #00285A;
    margin: 0;
  }

  /* Important box */
  .pp-important {
    background: #FFFBEA;
    border: 1px solid #FABE0A;
    border-left: 4px solid #FABE0A;
    border-radius: 0 8px 8px 0;
    padding: 14px 18px;
    margin: 18px 0;
    font-size: 14px;
    line-height: 1.7;
    color: #4a3500;
  }

  /* Sub-headings inside SMS section */
  .pp-sub-heading {
    font-size: 14px;
    font-weight: 700;
    color: #00285A;
    margin: 20px 0 8px;
  }

  /* Contact table */
  .pp-contact-table-wrap {
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }
  .pp-contact-table { width: 100%; border-collapse: collapse; font-size: 14px; }
  .pp-contact-table tr { border-bottom: 1px solid #f0f2f5; }
  .pp-contact-table tr:last-child { border-bottom: none; }
  .pp-ct-label {
    padding: 13px 18px;
    font-weight: 700;
    color: #00285A;
    background: #F5F8FC;
    white-space: nowrap;
    width: 190px;
    vertical-align: top;
    border-right: 1px solid #e2e8f0;
  }
  .pp-ct-value {
    padding: 13px 18px;
    color: #374151;
    line-height: 1.6;
  }

  /* Footer */
  .pp-footer {
    background: #00285A;
    border-top: 4px solid #FABE0A;
    padding: 28px 24px;
  }
  .pp-footer-inner {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .pp-footer-logo {
    height: 36px;
    width: auto;
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }
  .pp-footer p {
    font-size: 13px;
    color: #a8c8e8;
    text-align: center;
  }
  .pp-footer a {
    color: #FABE0A;
    text-decoration: none;
  }
  .pp-footer a:hover { text-decoration: underline; }

  @media (max-width: 640px) {
    .pp-nav { display: none; }
    .pp-ct-label { width: 120px; font-size: 12px; }
    .pp-ct-value { font-size: 13px; }
  }
`;