import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Valitse Liittymä — Vertaa ja säästä liittymäkuluissa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0C1222 0%, #164E63 50%, #0891B2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="white" />
            <rect x="10" y="4" width="12" height="24" rx="3" fill="#0891b2" />
            <rect x="12" y="7" width="8" height="15" rx="1" fill="white" />
            <circle cx="16" cy="25" r="1.5" fill="white" />
          </svg>
          <div style={{ fontSize: 48, fontWeight: 800, color: 'white' }}>
            Valitse Liittymä
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#94A3B8', maxWidth: 700, textAlign: 'center' }}>
          Vertaa puhelinliittymiä ja laajakaistoja Suomessa — löydä halvin liittymä
        </div>
      </div>
    ),
    { ...size }
  );
}
