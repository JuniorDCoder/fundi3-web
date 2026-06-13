/**
 * Routes that render their own full-height shell (or are embedded in an
 * iframe/WebView) and must not show the public Navbar/Footer or <main> padding.
 */
export const HIDDEN_CHROME_PREFIXES = ["/admin", "/embed", "/connect"];

export function isChromeHidden(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return HIDDEN_CHROME_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
