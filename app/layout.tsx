import type { Metadata } from 'next';
import Script from 'next/script';
import TrackingBootstrap from '@/components/TrackingBootstrap';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI for Business Unlocked — May 16, 2026 · Gainesville, FL',
  description:
    'A one-day hands-on workshop where local business owners build real AI tools for their business. May 16, 2026 · Best Western Gateway Grand, Gainesville, FL. Only 25 seats.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'AI for Business Unlocked — May 16, 2026 · Gainesville, FL',
    description:
      'Stop guessing. Start using AI to grow your business. Join 20 local business owners for a hands-on workshop.',
    type: 'website',
    url: 'https://www.aibusinessunlock.com',
    siteName: 'AI for Business Unlocked',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI for Business Unlocked — One-day workshop, May 16, 2026, Gainesville FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Business Unlocked — May 16, 2026 · Gainesville, FL',
    description:
      'Stop guessing. Start using AI to grow your business. Join 20 local business owners for a hands-on workshop.',
    images: ['/og-image.jpg'],
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
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TCX8BT4H');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TCX8BT4H"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <TrackingBootstrap />
        {children}
        <Script src="/chat-widget/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
