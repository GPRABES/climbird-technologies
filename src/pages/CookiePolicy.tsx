import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 bg-light-bg min-h-screen">
      <Helmet>
        <title>Cookie Policy | Climbird Technologies</title>
        <meta name="description" content="Cookie Policy for Climbird Technologies." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black text-dark mb-8 tracking-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          Cookie Policy
        </h1>
        <p className="text-gray-500 mb-12">Last Updated: May 1, 2026</p>

        <article className="prose prose-lg max-w-none text-gray-700 space-y-8" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          <section>
            <p>
              This Cookie Policy explains what cookies are and how we use them, the types of cookies we use, i.e., the information we collect using cookies and how that information is used, and how to control the cookie preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make it more secure, provide better user experience, and understand how the website performs and to analyze what works and where it needs improvement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">How Do We Use Cookies?</h2>
            <p>
              As most of the online services, our website uses first-party and third-party cookies for several purposes. First-party cookies are mostly necessary for the website to function the right way, and they do not collect any of your personally identifiable data.
            </p>
            <p className="mt-4">
              The third-party cookies used on our website are mainly for understanding how the website performs, how you interact with our website, keeping our services secure, providing advertisements that are relevant to you, and all in all providing you with a better and improved user experience and help speed up your future interactions with our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">What Types of Cookies Do We Use?</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Essential:</strong> Some cookies are essential for you to be able to experience the full functionality of our site. They allow us to maintain user sessions and prevent any security threats. They do not collect or store any personal information.</li>
              <li><strong>Statistics:</strong> These cookies store information like the number of visitors to the website, the number of unique visitors, which pages of the website have been visited, the source of the visit, etc. These data help us understand and analyze how well the website performs and where it needs improvement.</li>
              <li><strong>Marketing:</strong> Our website may display advertisements. These cookies are used to personalize the advertisements that we show to you so that they are meaningful to you. These cookies also help us keep track of the efficiency of these ad campaigns.</li>
              <li><strong>Functional:</strong> These are the cookies that help certain non-essential functionalities on our website. These functionalities include embedding content like videos or sharing content of the website on social media platforms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">How Can I Control the Cookie Preferences?</h2>
            <p>
              You can manage your cookies preferences by changing your browser's settings to block/delete cookies. To find out more about out how to manage and delete cookies, visit wikipedia.org, www.allaboutcookies.org.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
