export const hasMoreThanXCharacters = (str: string, x: number) =>
  Boolean(str) && str.length > x;
