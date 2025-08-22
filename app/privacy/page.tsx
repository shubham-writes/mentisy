import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">Effective Date: [Insert Date]</p>

      <section className="space-y-4">
        <p>
          Welcome to <strong>Mentisy.com</strong> (&ldquo;Mentisy&ldquo;, &ldquo;we&ldquo;, &ldquo;our&ldquo;, &ldquo;us&ldquo;).
          We respect your privacy and are committed to protecting your personal
          data.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
        <p>
          We may collect account info (email, name), uploaded content (images,
          videos, notes), and usage data (logs, IP address, device/browser type).
          We do <strong>not sell your data</strong> to third parties.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide core features (uploading, sharing, expiring links).</li>
          <li>Improve the service (debugging, analytics).</li>
          <li>Keep Mentisy secure (fraud/spam detection).</li>
          <li>Send important service emails (e.g. login, updates).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">3. Sharing of Data</h2>
        <p>
          We do not share your personal data except with trusted providers
          (hosting, authentication, email services), or if required by law.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Your Rights</h2>
        <p>
          You may access, update, or delete your data, request account deletion,
          or opt out of certain communications depending on your location.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. Security</h2>
        <p>
          We use secure hosting and limited access controls. However:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>No end-to-end encryption</strong> is currently offered.
          </li>
          <li>
            It is technically impossible to fully prevent downloads,
            screenshots, or recordings once content is visible.
          </li>
          <li>
            We use measures like auto-expiry, watermarking, and view limits, but
            these are not foolproof.
          </li>
        </ul>
        <p>
          Please avoid sharing highly sensitive or confidential information.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Children’s Privacy</h2>
        <p>
          Mentisy is not intended for children under 13 (or the age of digital
          consent in your country).
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Changes</h2>
        <p>
          We may update this Privacy Policy. The latest version will always be
          available here.
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Contact</h2>
        <p>
          If you have questions, email us at{" "}
          <a
            href="mailto:support@mentisy.com"
            className="text-blue-600 hover:underline"
          >
            support@mentisy.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
