/**
 * Lazy-loads the Calendly popup widget (script + styles) on first use and
 * opens the scheduling overlay in-page instead of navigating to a new tab.
 * The assets are fetched only when a visitor actually clicks a booking button.
 */

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

let loader: Promise<void> | null = null;

function loadWidget(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    if (!document.querySelector('link[data-calendly="css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = WIDGET_CSS;
      link.dataset.calendly = "css";
      document.head.appendChild(link);
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-calendly="js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Calendly failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.dataset.calendly = "js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly failed to load"));
    document.head.appendChild(script);
  });

  return loader;
}

/**
 * Opens the Calendly popup for the given scheduling URL. Returns false if the
 * widget could not be loaded, so callers can fall back to a normal link.
 */
export async function openCalendlyPopup(url: string): Promise<boolean> {
  try {
    await loadWidget();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
      return true;
    }
  } catch {
    /* fall through to the caller's fallback */
  }
  return false;
}
