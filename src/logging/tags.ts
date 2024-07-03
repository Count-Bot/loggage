import { B } from '../formatting/background.js';
import { S } from '../formatting/style.js';
import { Verbosity } from '../typings/logging.js';

export const TAGS: Readonly<Record<keyof typeof Verbosity, string>> = {
  FATAL_ERROR: S.reset(B.red(' ERROR ')) + ' ' + S.reset(B.magenta(' FATAL ')) + pad(' ERROR   FATAL '),
  ERROR: S.reset(B.red(' ERROR ')) + pad(' ERROR '),
  WARNING: S.reset(B.orange(' WARNING ')) + pad(' WARNING '),
  INFO: S.reset(B.grey(' INFO ')) + pad(' INFO '),
  DEBUG: S.reset(B.cyan(' DEBUG ')) + pad(' DEBUG '),
  VERBOSE: S.reset(B.blue(' VERBOSE ')) + pad(' VERBOSE '),
};

/**
 * Pad a word with spaces to the right.
 * @param {string} word The word to pad.
 * @param {number} length The length of the padding.
 * @returns {string} string
 */
function pad(word: string, length = 18): string {
  return ' '.repeat(Math.max(length - word.length, 1));
}