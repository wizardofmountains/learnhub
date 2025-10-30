import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-rose-50 to-white px-4 py-20 dark:from-zinc-900 dark:to-zinc-950 sm:px-6 lg:px-8 lg:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            {/* Hero Title */}
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
              Teile und Entdecke{" "}
              <span className="text-red-600 dark:text-red-500">
                Lernressourcen
              </span>
            </h1>

            {/* Hero Description */}
            <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
              Deine easy Plattform, wo du dir von Andi kuratierte Lernressourcen holen kannst.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/resources"
                className="flex items-center justify-center gap-2 rounded-lg bg-rose-500 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              >
                Browse Ressourcen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/submit"
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-8 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
              >
                Teile Ressourcen
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/20">
                  <Video className="h-6 w-6 text-rose-600 dark:text-rose-500" />
                </div>
                <p className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Videos
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Lerne durch Videos
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <FileText className="h-6 w-6 text-green-600 dark:text-green-500" />
                </div>
                <p className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Artikel
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Lese und erkunde
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
                  Downloade und lerne
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
              Warum Babsis Lernspace?
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Weil Andi dir die besten Lernressourcen sucht und sie dir zur Verfügung stellt.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Einfaches Teilen
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Teile deine Lieblingslernressourcen mit nur einem Link und
                einer Beschreibung. Keine Dateien hochladen.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Entdecke Qualität
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Browse kuratierte Lernressourcen geteilt von Schülern, Lehrern,
                und Selbstlernern.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Suche & Filter
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Finde genau das, was du brauchst mit einer leistungsstarken Suche und Filter nach Ressourcentyp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
