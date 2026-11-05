// Public site URL used for metadata (social sharing, canonical).
// Set NEXT_PUBLIC_SITE_URL to the real domain before deploying to
// production (e.g. https://neumann.com). There is no hard-coded
// production domain in the codebase on purpose.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";