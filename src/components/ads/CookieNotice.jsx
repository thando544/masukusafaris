import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "masuku-ad-consent";

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function applyConsent(granted) {
  gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
}

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
      return;
    }
    applyConsent(saved === "granted");
  }, []);

  function choose(granted) {
    window.localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    applyConsent(granted);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-70 border-t border-zinc-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md md:p-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-zinc-700">
          We use cookies and Google AdSense so we can show ads, remember
          preferences, and measure visits. Google and its partners may serve ads
          based on your activity on this site and others. See our{" "}
          <Link to="/legal/privacy-policy" className="font-semibold underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline"
          >
            How Google uses data
          </a>
          . This is not an invitation to click ads.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white"
          >
            Accept ads cookies
          </button>
        </div>
      </div>
    </div>
  );
}
