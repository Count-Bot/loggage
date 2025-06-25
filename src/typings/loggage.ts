export enum Verbosity {
  FatalError,
  Error,
  Warning,
  Info,
  Debug,
  Verbose,
}

export interface LoggageOptions {
  name: string;
  verbosity?: Verbosity;
  save?: boolean;
}
