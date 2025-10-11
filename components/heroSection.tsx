import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative box-border flex h-screen w-full items-center justify-center">
      <section
        style={{ maxWidth: "95ch" }}
        className="grid -translate-y-[20px] items-center justify-center gap-y-5 px-4"
      >
        <h1 className="mb-4 bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl lg:text-8xl">
          Welcome to Openlibrary: Your Campus Knowledge Hub!
        </h1>
        <p className="d:text-base mx-auto max-w-2xl px-4 text-center text-sm text-[#6B7280] lg:px-0 lg:text-lg">
          Discover, read, and share textbooks, notes, and more with AI-powered
          search and annotations. Join study groups, RSVP for book launches, and
          sync your academic journey—all in one vibrant platform!
        </p>
        <button
          style={{ fontWeight: "800" }}
          className="mx-auto mt-6 w-fit rounded-lg bg-stone-700 px-6 py-3 text-center font-semibold text-white shadow-lg transition-colors duration-150 hover:bg-stone-800"
        >
          <Link href={`/books`}> Start Exploring</Link>
        </button>
      </section>
    </div>
  );
}
