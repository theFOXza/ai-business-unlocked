import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuizSnapshot from '@/components/quiz/QuizSnapshot';
import type { QuizResult } from '@/lib/quiz-scoring';
import { quizDisclaimer } from '@/lib/quiz-scoring';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const getResultById = async (id: string): Promise<QuizResult | null> => {
  try {
    const filePath = path.join(process.cwd(), 'data', 'quiz-results', `${id}.json`);
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw) as QuizResult;
    return parsed;
  } catch {
    return null;
  }
};

export default async function QuizSnapshotPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = searchParams?.id;

  if (!id) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Navbar />
        <main className="section">
          <div className="container-narrow space-y-6">
            <h1 className="text-2xl font-semibold">Missing snapshot ID</h1>
            <p className="text-[var(--color-text-muted)]">
              We couldn&apos;t find your results. Take the assessment again to generate a new snapshot.
            </p>
            <Link href="/quiz" className="btn btn-primary">
              Take the assessment →
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const result = await getResultById(id);

  if (!result) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Navbar />
        <main className="section">
          <div className="container-narrow space-y-6">
            <h1 className="text-2xl font-semibold">Snapshot not found</h1>
            <p className="text-[var(--color-text-muted)]">
              This snapshot link might have expired. Take the assessment again to generate a new one.
            </p>
            <Link href="/quiz" className="btn btn-primary">
              Take the assessment →
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aibusinessunlock.com';
  const shareUrl = `${siteUrl}/quiz/snapshot?id=${encodeURIComponent(id)}`;

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />
      <main className="section">
        <div className="container-narrow space-y-8">
          <QuizSnapshot result={result} shareUrl={shareUrl} />
          <p className="text-xs text-[var(--color-text-muted)]">{quizDisclaimer}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
