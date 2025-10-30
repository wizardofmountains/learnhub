import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-white px-4 py-20 dark:from-zinc-900 dark:to-zinc-950 sm:px-6 lg:px-8 lg:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            {/* Hero Title */}
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
              Share and Discover{" "}
              <span className="text-blue-600 dark:text-blue-500">
                Learning Resources
              </span>
            </h1>

            {/* Hero Description */}
            <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
              A simple platform where students, teachers, and self-learners can
              share valuable learning resources and help each other grow.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/resources"
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Browse Resources
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/submit"
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-8 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
              >
                Share Resource
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Video className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                </div>
                <p className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Videos
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Learn through video
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <FileText className="h-6 w-6 text-green-600 dark:text-green-500" />
                </div>
                <p className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Articles
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Read and explore
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-500" />
                </div>
                <p className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  PDFs
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Download and study
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-white px-4 py-16 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Why LearnHub?
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Simple, focused, and effective learning resource sharing
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Easy Sharing
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Share your favorite learning resources with just a link and
                description. No file uploads needed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Discover Quality
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Browse curated learning resources shared by students, teachers,
                and self-learners.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Search & Filter
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Find exactly what you need with powerful search and filter by
                resource type.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
