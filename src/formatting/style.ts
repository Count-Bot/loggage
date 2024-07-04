export const S = {
  reset: (text: string): string => `${text}\x1b[0m`,
  bright: (text: string): string => `\x1b[1m${text}`,
  dim: (text: string): string => `\x1b[2m${text}`,
  italic: (text: string): string => `\x1b[3m${text}`,
  underline: (text: string): string => `\x1b[4m${text}`,
  slow_blink: (text: string): string => `\x1b[5m${text}`,
  fast_blink: (text: string): string => `\x1b[6m${text}`,
  reverse: (text: string): string => `\x1b[7m${text}`,
  conceal: (text: string): string => `\x1b[8m${text}`,
  crossed: (text: string): string => `\x1b[9m${text}`,
};
