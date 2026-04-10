'use client'

import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-Q3MR58J1E7'

export default function GoogleAnalytics() {
  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
          if (typeof localStorage !== 'undefined' && localStorage.getItem('analytics_consent') === 'granted') {
            gtag('consent', 'update', {
              'analytics_storage': 'granted'
            });
          }
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
