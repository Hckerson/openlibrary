export default function Terms() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-3xl font-bold">
            Terms of Use - OpenLibrary.app
          </h1>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">
              1. Acceptance of Terms
            </h2>
            <p>
              By creating an account or using OpenLibrary.app, you agree to
              these Terms of Use. If you do not agree, you may not use the
              platform.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">2. Eligibility</h2>
            <p>The platform is intended for students aged 16 years or older.</p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">
              3. User Responsibilities
            </h2>
            <p>
              You are responsible for your account credentials. Upload only
              documents you have rights to. Do not upload harmful or illegal
              content.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">4. Use of Services</h2>
            <p>
              Free features include search, reading, bookmarks, and collections.
              Paid features include AI-powered document processing and chatbot,
              managed via credits.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">5. Payments</h2>
            <p>
              Credit purchases are securely processed via Stripe. Refunds are
              provided only where required by law.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">
              6. Intellectual Property
            </h2>
            <p>
              Users own their uploaded documents. OpenLibrary.app retains rights
              to generate metadata and embeddings. Platform software remains the
              property of the development team.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">
              7. Prohibited Activities
            </h2>
            <p>
              Users may not misuse credits, upload malicious content, or engage
              in spamming or scraping.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">
              8. Limitation of Liability
            </h2>
            <p>
              {`            OpenLibrary.app is provided 'as is'. We do not guarantee
            uninterrupted access or absolute accuracy of AI processing.`}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">9. Termination</h2>
            <p>
              Accounts may be suspended or terminated for violations. Users may
              also delete their accounts at any time.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">10. Governing Law</h2>
            <p>
              {`              These Terms are governed by applicable laws in the platform's
              operating jurisdiction.`}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-2xl font-semibold">11. Contact</h2>
            <p>For inquiries, contact support@openlibrary.app</p>
          </section>
        </div>
      </div>
    </>
  );
}
