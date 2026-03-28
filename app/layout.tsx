import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'AI for Business Unlocked — Hands-On AI Workshop | Gainesville, FL',
  description:
    'Learn to use AI for your business in one day. Hands-on workshop for local business owners. April 25, 2026 in Gainesville, FL. Limited to 25 seats.',
  openGraph: {
    title: 'AI for Business Unlocked',
    description:
      'One-day hands-on AI workshop for business owners. Build real tools for YOUR business.',
    images: ['/og-image.jpg'],
    url: 'https://aibusinessunlock.com',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>{children}</body>
    </html>
  );
}
