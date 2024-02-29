export const REVALIDATE_TIME = 2 * 60; // 3 minutes
export const cacheProps = {
  cache: 'reload' as RequestCache,
  next: { revalidate: REVALIDATE_TIME }
};
