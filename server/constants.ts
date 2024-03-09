// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic';

export const REVALIDATE_TIME = 15; // 15 seconds
export const cacheProps = {
  cache: 'no-store',
  next: { revalidate: REVALIDATE_TIME }
} as const;
