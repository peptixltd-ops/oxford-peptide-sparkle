/**
 * Visually hidden until focused — first tab-stop on every page.
 * Jumps keyboard/screen-reader users past the header straight to <main>.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-navy-deep focus:text-bone focus:text-sm focus:font-semibold focus:rounded-sm focus:outline-2 focus:outline-gold"
    >
      Skip to main content
    </a>
  );
}
