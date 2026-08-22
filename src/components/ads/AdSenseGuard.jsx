import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function shouldHideAds(pathname) {
  if (pathname === "/") return false;
  if (pathname === "/packages" || pathname.startsWith("/packages/")) return false;
  if (pathname === "/activities" || pathname.startsWith("/activities/")) {
    return false;
  }
  if (pathname === "/about") return false;
  return true;
}

function removeInjectedAds() {
  document
    .querySelectorAll(".google-auto-placed, ins.adsbygoogle")
    .forEach((node) => node.remove());
}

export default function AdSenseGuard() {
  const { pathname } = useLocation();
  const hideAds = shouldHideAds(pathname);

  useEffect(() => {
    document.body.classList.toggle("adsense-no-ads", hideAds);
    document.body.classList.toggle("adsense-content", !hideAds);

    const ads = window.adsbygoogle || [];
    window.adsbygoogle = ads;
    ads.pauseAdRequests = hideAds ? 1 : 0;

    if (hideAds) {
      removeInjectedAds();
      const observer = new MutationObserver(removeInjectedAds);
      observer.observe(document.body, { childList: true, subtree: true });
      return () => {
        observer.disconnect();
        document.body.classList.remove("adsense-no-ads");
      };
    }

    return () => {
      document.body.classList.remove("adsense-content");
    };
  }, [hideAds]);

  return null;
}
