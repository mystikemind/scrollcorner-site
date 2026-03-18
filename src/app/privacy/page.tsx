export const metadata = {
  title: 'Privacy Policy — ScrollCorner',
  description: 'ScrollCorner privacy policy covering data collection, cookies, and third-party services.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
      <p className="text-white/30 text-sm mb-8">Last updated: March 2026</p>

      <div className="space-y-8 text-white/60 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-3">1. Introduction</h2>
          <p>
            ScrollCorner (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website scrollcorner.com. This Privacy Policy explains how we collect, use, and protect information when you visit our site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">2. Information We Collect</h2>
          <p>
            We do not collect personal information directly. However, third-party services embedded on this site may collect data automatically, including:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-white/50">
            <li>IP address and approximate location</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on site</li>
            <li>Referring website</li>
            <li>Device type (desktop, mobile, tablet)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">3. Cookies</h2>
          <p>
            This site uses cookies from third-party services including Google Analytics and Google AdSense. These cookies help us understand site traffic and display relevant advertisements. You can disable cookies in your browser settings at any time, though this may affect site functionality.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">4. Advertising</h2>
          <p>
            ScrollCorner uses Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalised advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#e63946] hover:underline">
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">5. Third-Party Links</h2>
          <p>
            Articles on ScrollCorner may link to external websites. We are not responsible for the privacy practices or content of those sites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">6. Children&apos;s Privacy</h2>
          <p>
            ScrollCorner is not directed at children under 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">8. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{' '}
            <a href="mailto:contact@scrollcorner.com" className="text-[#e63946] hover:underline">
              contact@scrollcorner.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
