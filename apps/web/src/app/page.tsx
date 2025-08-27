import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Web is live</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">Welcome to World Quest.</p>
      <ul className="space-y-2">
        <li>
          <Link href="/launch" className="text-blue-600 dark:text-blue-400 hover:underline">
            Open launcher (App Router)
          </Link>
        </li>
        <li>
          <Link href="/launcher" className="text-blue-600 dark:text-blue-400 hover:underline">
            Open launcher (legacy Pages)
          </Link>
        </li>
        <li>
          <Link href="/flag-quiz" className="text-blue-600 dark:text-blue-400 hover:underline">
            Go to Flag Quiz
          </Link>
        </li>
      </ul>
    </>
  );
}
