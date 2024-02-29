export const REVALIDATE_TIME = 2 * 60; // 3 minutes
export const cacheProps = {
  cache: 'force-cache' as RequestCache,
  next: { revalidate: REVALIDATE_TIME }
};
