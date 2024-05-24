export const C = {
  black: (text: string): string => `\x1b[30m${text}`,
  red: (text: string): string => `\x1b[31m${text}`,
  green: (text: string): string => `\x1b[32m${text}`,
  yellow: (text: string): string => `\x1b[33m${text}`,
  blue: (text: string): string => `\x1b[34m${text}`,
  magenta: (text: string): string => `\x1b[35m${text}`,
  cyan: (text: string): string => `\x1b[36m${text}`,
  white: (text: string): string => `\x1b[37m${text}`,
  orange: (text: string): string => `\x1b[38;5;202m${text}`,
  grey: (text: string): string => `\x1b[38;5;243m${text}`,
};