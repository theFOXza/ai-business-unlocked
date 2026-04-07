import Link from 'next/link';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuizIntro from '@/components/quiz/QuizIntro';
import QuizUtmTracker from '@/components/quiz/QuizUtmTracker';

export default function QuizLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar homeHref="/" showQuizButton={false} registerHref="/#register" />
      <Suspense fallback={null}>
        <QuizUtmTracker />
      </Suspense>
      <main>
        <QuizIntro />
      </main>
      <Footer />
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-divider)] bg-white/95 p-3 backdrop-blur md:hidden">
        <Link href="/quiz/take" className="btn btn-primary btn-full">
          Start Assessment →
        </Link>
      </div>
    </div>
  );
}
