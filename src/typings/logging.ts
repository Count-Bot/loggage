export enum Verbosity {
  FATAL_ERROR,
  ERROR,
  WARNING,
  INFO,
  DEBUG,
  VERBOSE,
}

export interface LoggerOptions {
  name: string,
  verbosity?: Verbosity,
  logToFile?: boolean,
}
