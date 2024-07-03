import { Console } from 'node:console';
import { createWriteStream } from 'node:fs';
import dayjs from 'dayjs';

import { C, S } from '../formatting/index.js';
import { LoggerOptions, Verbosity } from '../typings/logging.js';
import { TAGS } from './tags.js';

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

    const timestamp = dayjs(new Date()).format('YYYY-MM-DD HH-mm-ss');

    this.console = new Console({
      stdout: process.stdout,
    });

    if (logToFile) {
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

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public fatal_error(message: unknown): void {
    if (this.verbosity >= Verbosity.FATAL_ERROR) {
      this.log(TAGS.FATAL_ERROR, message);
    }
  }

  public error(message: unknown): void {
    if (this.verbosity >= Verbosity.ERROR) {
      this.log(TAGS.ERROR, message);
    }
  }

  public warning(message: unknown): void {
    if (this.verbosity >= Verbosity.WARNING) {
      this.log(TAGS.WARNING, message);
    }
  }

  public info(message: unknown): void {
    if (this.verbosity >= Verbosity.INFO) {
      this.log(TAGS.INFO, message);
    }
  }

  public debug(message: unknown): void {
    if (this.verbosity >= Verbosity.DEBUG) {
      this.log(TAGS.DEBUG, message);
    }
  }

  public verbose(message: unknown): void {
    if (this.verbosity >= Verbosity.VERBOSE) {
      this.log(TAGS.VERBOSE, message);
    }
  }

  private log(tag: string, message: unknown): void {
    const log = `${S.reset(C.green(new Date().toLocaleTimeString()))} ${this.name} ${tag}`;

    this.console.log(log, message);

    if (this.logToFile) {
      this.file.log(log, message);
    }
  }
}