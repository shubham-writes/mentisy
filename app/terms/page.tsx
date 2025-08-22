import React from "react";

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-gray-600 mb-8">Effective Date: [Insert Date]</p>

      <section className="space-y-4">
        <p>
          Welcome to <strong>Mentisy.com</strong> (&ldquo;Mentisy&ldquo;, &ldquo;we&ldquo;, &ldquo;our&ldquo;, &ldquo;us&ldquo;).
          By using our platform, you agree to these Terms of Service. Please
          read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Using Mentisy</h2>
        <p>
          You may use Mentisy only for lawful purposes. Do not misuse the
          service, attempt unauthorized access, or upload illegal or harmful
          content.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Content Ownership</h2>
        <p>
          You own the content you upload. By uploading, you grant us a limited
          license to store, process, and display it as needed to provide the
          service. We do not claim ownership.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. Security & Limitations</h2>
        <p>
          We use techniques like expiring links, watermarking, and limited
          access, but we cannot guarantee complete protection against downloads,
          screenshots, or misuse. Please avoid uploading extremely sensitive
          data.
        </p>

        <h2 className="text-xl font-semibold mt-6">4. Termination</h2>
        <p>
          We may suspend or terminate accounts that violate these Terms. You may
          delete your account anytime.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. Liability</h2>
        <p>
          Mentisy is provided &ldquo;as is&ldquo;. We are not liable for damages, data loss,
          or misuse caused by third parties or user actions.
        </p>

        <h2 className="text-xl font-semibold mt-6">6. Changes</h2>
        <p>
          We may update these Terms of Service. Continued use of Mentisy means
          you accept the latest version.
        </p>

        <h2 className="text-xl font-semibold mt-6">7. Contact</h2>
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
