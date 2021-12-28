export const C = {
	black: (text: string) => `\x1b[30m${text}`,
	red: (text: string) => `\x1b[31m${text}`,
	green: (text: string) => `\x1b[32m${text}`,
	yellow: (text: string) => `\x1b[33m${text}`,
	blue: (text: string) => `\x1b[34m${text}`,
	magenta: (text: string) => `\x1b[35m${text}`,
	cyan: (text: string) => `\x1b[36m${text}`,
	white: (text: string) => `\x1b[37m${text}`,
	orange: (text: string) => `\x1b[38;5;202m${text}`,
};