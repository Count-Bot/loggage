export enum Verbosity {
  FATAL_ERROR,
  ERROR,
  WARNING,
  INFO,
  DEBUG,
  VERBOSE,
}

export interface LoggageOptions {
  name: string;
  verbosity?: Verbosity;
  save?: boolean;
}
