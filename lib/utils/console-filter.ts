let isSuppressionActive = false;

export const suppressDodoPaymentsWarnings = (): void => {
  if (typeof window === 'undefined' || isSuppressionActive) return;

  isSuppressionActive = true;

  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = (...args: unknown[]): void => {
    const message = args.join(' ');
    if (
      message.includes('Ignored message from unexpected origin') &&
      message.includes('dodopayments')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };

  console.error = (...args: unknown[]): void => {
    const message = args.join(' ');
    if (
      message.includes('Ignored message from unexpected origin') &&
      message.includes('dodopayments')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
};
