import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI for Business Unlocked — April 25, 2026 · Gainesville, FL',
  description:
    'A one-day hands-on workshop where local business owners build real AI tools for their business. April 25, 2026 · Best Western Gateway Grand, Gainesville, FL. Only 25 seats.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'AI for Business Unlocked — April 25, 2026 · Gainesville, FL',
    description:
      'Stop guessing. Start using AI to grow your business. Join 20 local business owners for a hands-on workshop.',
    type: 'website',
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
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src="/chat-widget/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
