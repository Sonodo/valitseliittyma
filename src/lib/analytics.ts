/**
 * Analytics helpers — GA4 (gtag) + Microsoft Clarity.
 *
 * All helpers are SSR-safe and no-op gracefully when the browser globals are
 * missing, when running outside a browser, or when a tracker has not yet
 * initialised. They never throw.
 */

type EventParams = Record<string, unknown>;

type ClarityFn = (command: string, ...args: unknown[]) => void;

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
  clarity?: ClarityFn;
};

function getWindow(): AnalyticsWindow | null {
  if (typeof window === 'undefined') return null;
  return window as AnalyticsWindow;
}

/**
 * Fire a generic GA4 event. Safe to call anywhere — no-ops on the server or
 * before gtag has loaded.
 */
export function trackEvent(name: string, params?: EventParams): void {
  const w = getWindow();
  if (!w) return;
  try {
    if (typeof w.gtag === 'function') {
      w.gtag('event', name, params ?? {});
    } else if (Array.isArray(w.dataLayer)) {
      // Fallback: push into dataLayer so the event is captured once gtag boots.
      w.dataLayer.push({ event: name, ...(params ?? {}) });
    }
  } catch {
    // Swallow — analytics must never break the UI.
  }
}

/**
 * Fire a Clarity custom event. No-ops if Clarity has not booted yet.
 */
function trackClarityEvent(name: string): void {
  const w = getWindow();
  if (!w) return;
  try {
    if (typeof w.clarity === 'function') {
      w.clarity('event', name);
    }
  } catch {
    // Swallow.
  }
}

/**
 * Track an outbound affiliate click to an operator.
 * Pushes to GA4 + Clarity in a single call.
 */
export function trackAffiliateClick(
  provider: string,
  productType: string,
  extras?: EventParams,
): void {
  trackEvent('affiliate_click', {
    provider,
    product_type: productType,
    ...(extras ?? {}),
  });
  trackClarityEvent('affiliate_click');
}

/**
 * Track a lead event (newsletter signup, contact form, etc.).
 */
export function trackLead(source: string, params?: EventParams): void {
  trackEvent('lead', {
    source,
    ...(params ?? {}),
  });
  trackClarityEvent('lead');
}

/**
 * Track when the user initiates a comparison flow (hero CTA, filter bar, etc.).
 */
export function trackBeginCompare(): void {
  trackEvent('begin_compare');
  trackClarityEvent('begin_compare');
}
