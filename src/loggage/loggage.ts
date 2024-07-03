import { Console } from 'node:console';
import { createWriteStream } from 'node:fs';
import dayjs from 'dayjs';

import { B, C, S } from '../formatting/index.js';
import { LoggageOptions, Verbosity } from '../typings/loggage.js';

export class Loggage {
  private readonly console: Console;
  private readonly file: Console | undefined;
  private save: boolean;

  private name: string;
  private verbosity: Verbosity;

  public static TAGS: Readonly<Record<keyof typeof Verbosity, string>> = {
    FATAL_ERROR: S.reset(B.red(' ERROR ')) + ' ' + S.reset(B.magenta(' FATAL ')) + this.pad(' ERROR   FATAL '),
    ERROR: S.reset(B.red(' ERROR ')) + this.pad(' ERROR '),
    WARNING: S.reset(B.orange(' WARNING ')) + this.pad(' WARNING '),
    INFO: S.reset(B.grey(' INFO ')) + this.pad(' INFO '),
    DEBUG: S.reset(B.cyan(' DEBUG ')) + this.pad(' DEBUG '),
    VERBOSE: S.reset(B.blue(' VERBOSE ')) + this.pad(' VERBOSE '),
  };

  /**
   * Pad a word with spaces to the right.
   * @param word The word to pad.
   * @param length The length of the padding.
   * @returns  string
   */
  private static pad(word: string, length = 18): string {
    return ' '.repeat(Math.max(length - word.length, 1));
  }

  constructor ({
    name,
    verbosity = Verbosity.INFO,
    save = true,
  }: LoggageOptions) {
    this.name = name;
    this.verbosity = verbosity;
    this.save = save;

    const timestamp = dayjs(new Date()).format('YYYY-MM-DD HH-mm-ss');

    this.console = new Console({
      stdout: process.stdout,
    });

    if (save) {
      this.file = new Console({
        stdout: createWriteStream(`./logs/${name} ${timestamp}.log`),
      });
    }
  }

  public getVerbosity(): Verbosity {
    return this.verbosity;
  }

  public setVerbosity(verbosity: Verbosity): void {
    this.verbosity = verbosity;
  }

  public getSaveToFile(): boolean {
    return this.save;
  }

  public setSaveToFile(logToFile: boolean): void {
    this.save = logToFile;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public fatal_error(message: unknown): void {
    if (this.verbosity >= Verbosity.FATAL_ERROR) {
      this.log(Loggage.TAGS.FATAL_ERROR, message);
    }
  }

  public error(message: unknown): void {
    if (this.verbosity >= Verbosity.ERROR) {
      this.log(Loggage.TAGS.ERROR, message);
    }
  }

  public warning(message: unknown): void {
    if (this.verbosity >= Verbosity.WARNING) {
      this.log(Loggage.TAGS.WARNING, message);
    }
  }

  public info(message: unknown): void {
    if (this.verbosity >= Verbosity.INFO) {
      this.log(Loggage.TAGS.INFO, message);
    }
  }

  public debug(message: unknown): void {
    if (this.verbosity >= Verbosity.DEBUG) {
      this.log(Loggage.TAGS.DEBUG, message);
    }
  }

  public verbose(message: unknown): void {
    if (this.verbosity >= Verbosity.VERBOSE) {
      this.log(Loggage.TAGS.VERBOSE, message);
    }
  }

  private log(tag: string, message: unknown): void {
    const log = `${S.reset(C.green(new Date().toLocaleTimeString()))} ${this.name} ${tag}`;

    this.console.log(log, message);

    if (this.save && this.file) {
      this.file.log(log, message);
    }
  }
}