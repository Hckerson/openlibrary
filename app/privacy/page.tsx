
export default function Privacy() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy - OpenLibrary.app</h1>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>OpenLibrary.app respects the privacy of all users and is committed to protecting personal data. This Privacy Policy explains how we collect, use, store, and safeguard your information while you use our services.</p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
            <p>We collect account data (name, email, password), uploaded academic documents, usage data (searches, bookmarks, collections), and payment data (processed via Stripe).</p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">3. How We Use Information</h2>
            <p>We use data to provide platform features, process documents with AI, manage credits and billing, improve performance, and comply with laws.</p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">4. Data Sharing and Disclosure</h2>
            <p>We share limited data with third parties (e.g., Stripe, Cloudflare R2) as needed. We may disclose information for legal compliance. We do not sell user data.</p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
            <p>Passwords are encrypted, files stored securely, and all communication uses HTTPS encryption.</p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">6. User Rights</h2>
            <p>Users may access, update, delete their information, delete uploaded documents, or request a copy of their data.</p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">7. Data Retention</h2>
            <p>Data is retained only as long as necessary for services. Users may request deletion of their account and data.</p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">8. Children’s Privacy</h2>
            <p>The platform is intended for students 16 years and older. We do not knowingly collect data from younger children.</p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">9. Policy Updates</h2>
            <p>This policy may be updated periodically. Users will be notified of significant changes.</p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">10. Contact</h2>
            <p>For inquiries, contact privacy@openlibrary.app</p>
          </section>
        </div>
      </div>
    </>
  );
}