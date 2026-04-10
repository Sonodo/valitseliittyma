'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Smartphone, MonitorPlay, Music, Globe, MessageCircle } from 'lucide-react';

// Data usage per hour/session in GB
const USAGE_RATES = {
  videoStreaming: 1.5, // GB per hour (HD)
  musicStreaming: 0.07, // GB per hour
  socialMedia: 0.3, // GB per hour
  webBrowsing: 0.06, // GB per hour
  videoCalls: 0.5, // GB per hour
};

export default function DataCalculator() {
  const [videoHours, setVideoHours] = useState(5);
  const [musicHours, setMusicHours] = useState(10);
  const [socialHours, setSocialHours] = useState(15);
  const [browsingHours, setBrowsingHours] = useState(10);
  const [videoCallHours, setVideoCallHours] = useState(2);

  const totalGB =
    videoHours * USAGE_RATES.videoStreaming +
    musicHours * USAGE_RATES.musicStreaming +
    socialHours * USAGE_RATES.socialMedia +
    browsingHours * USAGE_RATES.webBrowsing +
    videoCallHours * USAGE_RATES.videoCalls;

  const recommendation =
    totalGB < 3 ? '3–5 Gt' :
    totalGB < 8 ? '5–10 Gt' :
    totalGB < 20 ? '10–20 Gt' :
    totalGB < 40 ? '20–50 Gt' :
    'Rajaton data';

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Kuukausittainen käyttösi</h2>

        <div className="space-y-6">
          <SliderInput
            icon={<MonitorPlay className="h-5 w-5 text-red-500" />}
            label="Videoiden katselu (YouTube, Netflix yms.)"
            value={videoHours}
            onChange={setVideoHours}
            max={60}
            unit="h/kk"
          />
          <SliderInput
            icon={<Music className="h-5 w-5 text-emerald-500" />}
            label="Musiikin kuuntelu (Spotify yms.)"
            value={musicHours}
            onChange={setMusicHours}
            max={100}
            unit="h/kk"
          />
          <SliderInput
            icon={<Smartphone className="h-5 w-5 text-blue-500" />}
            label="Sosiaalinen media (Instagram, TikTok yms.)"
            value={socialHours}
            onChange={setSocialHours}
            max={60}
            unit="h/kk"
          />
          <SliderInput
            icon={<Globe className="h-5 w-5 text-violet-500" />}
            label="Nettiselaus ja sähköposti"
            value={browsingHours}
            onChange={setBrowsingHours}
            max={60}
            unit="h/kk"
          />
          <SliderInput
            icon={<MessageCircle className="h-5 w-5 text-cyan-500" />}
            label="Videopuhelut (Teams, Zoom yms.)"
            value={videoCallHours}
            onChange={setVideoCallHours}
            max={40}
            unit="h/kk"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
        <h2 className="mb-4 text-xl font-bold text-cyan-900">Arvioitu datankulutus</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-4">
            <p className="text-sm text-slate-500">Kuukausittainen kulutus</p>
            <p className="text-3xl font-extrabold text-slate-900">
              {totalGB.toFixed(1).replace('.', ',')} Gt
            </p>
          </div>
          <div className="rounded-xl bg-cyan-600 p-4">
            <p className="text-sm text-cyan-200">Suosituksemme</p>
            <p className="text-3xl font-extrabold text-white">{recommendation}</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          * Arvio perustuu keskimääräiseen datankulutukseen. Todellinen kulutus voi vaihdella
          suoratoistopalvelun laadun, resoluution ja muiden tekijöiden mukaan.
        </p>
      </div>

      <div className="text-center">
        <Link
          href="/puhelinliittymat"
          className="inline-block rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
        >
          Löydä sopiva liittymä
        </Link>
      </div>
    </div>
  );
}

function SliderInput({
  icon,
  label,
  value,
  onChange,
  max,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (v: number) => void;
  max: number;
  unit: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
        <span className="text-sm font-bold text-slate-900">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-full accent-cyan-600"
      />
    </div>
  );
}
