import { Console } from 'node:console';
import { createWriteStream } from 'node:fs';
import { existsSync, mkdirSync } from 'node:fs';
import process from 'node:process';
import dayjs from 'dayjs';

import { B, C, S } from '../formatting/index.js';
import { LoggageOptions, Verbosity } from '../typings/loggage.js';

export class Loggage {
  private readonly console: Console;
  private readonly file: Console | undefined;
  private save: boolean;

  private name: string;
  private verbosity: Verbosity;

  constructor({ name, verbosity = Verbosity.Info, save = false }: LoggageOptions) {
    this.name = name;
    this.verbosity = verbosity;
    this.save = save;

    const timestamp = dayjs(new Date()).format('YYYY-MM-DD HH-mm-ss');

    this.console = new Console({
      stdout: process.stdout,
      stderr: process.stderr,
    });

    if (save) {
      if (!existsSync('./logs')) {
        mkdirSync('./logs', { recursive: true });
      }

      this.file = new Console({
        stdout: createWriteStream(`./logs/${name} ${timestamp}.log`),
        stderr: createWriteStream(`./logs/${name} ${timestamp}.err.log`),
      });
    }
  }

  public static TAGS: Readonly<Record<keyof typeof Verbosity, string>> = {
    FatalError: `${S.reset(B.red(' ERROR '))} ${S.reset(B.magenta(' FATAL '))}${this.pad(' ERROR   FATAL ')}`,
    Error: S.reset(B.red(' ERROR ')) + this.pad(' ERROR '),
    Warning: S.reset(B.orange(' WARNING ')) + this.pad(' WARNING '),
    Info: S.reset(B.grey(' INFO ')) + this.pad(' INFO '),
    Debug: S.reset(B.cyan(' DEBUG ')) + this.pad(' DEBUG '),
    Verbose: S.reset(B.blue(' VERBOSE ')) + this.pad(' VERBOSE '),
  };

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
    if (this.verbosity >= Verbosity.FatalError) {
      this.log(Loggage.TAGS.FatalError, message, true);
    }
  }

  public error(message: unknown): void {
    if (this.verbosity >= Verbosity.Error) {
      this.log(Loggage.TAGS.Error, message, true);
    }
  }

  public warning(message: unknown): void {
    if (this.verbosity >= Verbosity.Warning) {
      this.log(Loggage.TAGS.Warning, message, false);
    }
  }

  public info(message: unknown): void {
    if (this.verbosity >= Verbosity.Info) {
      this.log(Loggage.TAGS.Info, message, false);
    }
  }

  public debug(message: unknown): void {
    if (this.verbosity >= Verbosity.Debug) {
      this.log(Loggage.TAGS.Debug, message, false);
    }
  }

  public verbose(message: unknown): void {
    if (this.verbosity >= Verbosity.Verbose) {
      this.log(Loggage.TAGS.Verbose, message, false);
    }
  }

  private log(tag: string, message: unknown, err: boolean): void {
    const log = this.formatLogMessage(tag);

    if (err) {
      this.logError(log, message);
    } else {
      this.logMessage(log, message);
    }
  }

  private formatLogMessage(tag: string): string {
    return `${S.reset(C.green(new Date().toLocaleTimeString()))} ${this.name} ${tag}`;
  }

  private logError(log: string, message: unknown): void {
    if (this.save && this.file) {
      this.file.error(`${new Date().toLocaleTimeString()} ${this.name}`, message);
    }

    this.console.error(log, message);
  }

  private logMessage(log: string, message: unknown): void {
    if (this.save && this.file) {
      this.file.log(`${new Date().toLocaleTimeString()} ${this.name}`, message);
    }

    this.console.log(log, message);
  }

  /**
   * Pad a word with spaces to the right.
   * @param {string} word The word to pad.
   * @param {number} length The length of the padding.
   * @returns {string} string
   */
  private static pad(word: string, length = 18): string {
    return ' '.repeat(Math.max(length - word.length, 1));
  }
}
