import { Console } from 'console';
import { createWriteStream } from 'fs';
import { B, C, S } from '../formatting/index.js';
import { LoggerOptions, Verbosity } from '../typings/logging.js';

function pad(word: string, length = 18): string {
  return ' '.repeat(Math.max(length - word.length, 1));
}

export const TAGS: Readonly<Record<keyof typeof Verbosity, string>> = {
  FATAL_ERROR: S.reset(B.red(' ERROR ')) + ' ' + S.reset(B.magenta(' FATAL ')) + pad(' ERROR   FATAL '),
  ERROR: S.reset(B.red(' ERROR ')) + pad(' ERROR '),
  WARNING: S.reset(B.orange(' WARNING ')) + pad(' WARNING '),
  INFO: S.reset(B.grey(' INFO ')) + pad(' INFO '),
  DEBUG: S.reset(B.cyan(' DEBUG ')) + pad(' DEBUG '),
  VERBOSE: S.reset(B.blue(' VERBOSE ')) + pad(' VERBOSE '),
};

export class Logger {
  private readonly console: Console;
  private readonly file!: Console;
  private name: string;
  private verbosity: Verbosity;
  private readonly logToFile: boolean;

  constructor ({
    name,
    verbosity = Verbosity.INFO,
    logToFile = true,
  }: LoggerOptions) {
    this.name = name;
    this.verbosity = verbosity;
    this.logToFile = logToFile;

    // Format timestamp
    const timestamp = new Date().toLocaleString().replace(/\//g, '-').replace(/:/g, ';').replace(',', '');

    this.console = new Console({
      stdout: process.stdout,
    });

    if (logToFile)
      this.file = new Console({
        stdout: createWriteStream(`./logs/${name} ${timestamp}.log`),
      });
  }

  public setVerbosity(verbosity: Verbosity): void {
    this.verbosity = verbosity;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public fatal_error(message: unknown): void {
    if (this.verbosity >= Verbosity.FATAL_ERROR)
      this.log(TAGS.FATAL_ERROR, message);
  }

  public error(message: unknown): void {
    if (this.verbosity >= Verbosity.ERROR)
      this.log(TAGS.ERROR, message);
  }

  public warning(message: unknown): void {
    if (this.verbosity >= Verbosity.WARNING)
      this.log(TAGS.WARNING, message);
  }

  public info(message: unknown): void {
    if (this.verbosity >= Verbosity.INFO)
      this.log(TAGS.INFO, message);
  }

  public debug(message: unknown): void {
    if (this.verbosity >= Verbosity.DEBUG)
      this.log(TAGS.DEBUG, message);
  }

  public verbose(message: unknown): void {
    if (this.verbosity >= Verbosity.VERBOSE)
      this.log(TAGS.VERBOSE, message);
  }

  private log(tag: string, message: unknown): void {
    const log = `${S.reset(C.green(new Date().toLocaleTimeString()))} ${this.name} ${tag}`;

    this.console.log(log, message);
    if (this.logToFile) this.file.log(log, message);
  }
}