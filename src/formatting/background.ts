export const B = {
	black: (text: string) => `\x1b[40m${text}`,
	red: (text: string) => `\x1b[41m${text}`,
	green: (text: string) => `\x1b[42m${text}`,
	yellow: (text: string) => `\x1b[43m${text}`,
	blue: (text: string) => `\x1b[44m${text}`,
	magenta: (text: string) => `\x1b[45m${text}`,
	cyan: (text: string) => `\x1b[46m${text}`,
	white: (text: string) => `\x1b[47m${text}`,
	orange: (text: string) => `\x1b[48;5;202m${text}`,
};