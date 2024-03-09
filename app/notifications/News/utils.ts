export const addError = (hasError: boolean, stateString: any, error: string) =>
  hasError ? (stateString || '').concat(` - ${error}`) : stateString;
