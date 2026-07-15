'use client';

import { useState, useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function CookieBanner() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {

    const storedConsent = localStorage.getItem('cookie_consent');
    if (storedConsent === 'granted') {
      setConsent(true);
    } else if (storedConsent === 'denied') {
      setConsent(false);
    } else {
      setConsent(null);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'granted');
    setConsent(true);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'denied');
    setConsent(false);
  };


  if (consent === null) {
    return (
      <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-zinc-900 border border-zinc-800 p-4 rounded-md shadow-2xl z-50 text-gray-200 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-5">
        <p className="text-xs leading-relaxed">
          We use cookies for better user experience.
        </p>
        <div className="flex justify-end gap-2 text-xs font-semibold">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-600 text-zinc-950 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    );
  }


  if (consent === true) {
    return <GoogleAnalytics gaId="G-M2RKKGNB7T" />;
  }


  return null;
}