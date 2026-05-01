import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 bg-light-bg min-h-screen">
      <Helmet>
        <title>Privacy Policy | Climbird Technologies</title>
        <meta name="description" content="Privacy Policy for Climbird Technologies." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black text-dark mb-8 tracking-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-12">Last Updated: May 1, 2026</p>

        <article className="prose prose-lg max-w-none text-gray-700 space-y-8" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          <section>
            <p>
              Climbird Technologies ("us", "we", or "our") operates the climbirdtechnologies.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">Information Collection And Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            <h3 className="text-xl font-bold text-dark mt-6 mb-3">Types of Data Collected</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Email address, First name and last name, Phone number, Cookies and Usage Data.</li>
              <li><strong>Usage Data:</strong> We may also collect information how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">Use of Data</h2>
            <p>Climbird Technologies uses the collected data for various purposes:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer care and support</li>
              <li>To provide analysis or valuable information so that we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">Transfer Of Data</h2>
            <p>
              Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">Security Of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at info@climbirdtechnologies.com.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
