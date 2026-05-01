import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 bg-light-bg min-h-screen">
      <Helmet>
        <title>Terms of Service | Climbird Technologies</title>
        <meta name="description" content="Terms of Service for Climbird Technologies." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black text-dark mb-8 tracking-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          Terms of Service
        </h1>
        <p className="text-gray-500 mb-12">Last Updated: May 1, 2026</p>

        <article className="prose prose-lg max-w-none text-gray-700 space-y-8" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website and using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">2. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Climbird Technologies and its licensors. The Service is protected by copyright, trademark, and other laws of Nepal and foreign countries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">3. Links To Other Web Sites</h2>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by Climbird Technologies.
            </p>
            <p className="mt-4">
              Climbird Technologies has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Climbird Technologies shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">4. Limitation of Liability</h2>
            <p>
              In no event shall Climbird Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">5. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at info@climbirdtechnologies.com.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
