export interface Logger {
  logData(...arg0: unknown[]): void;
  errorData(...arg0: unknown[]): void;
  infoData(...arg0: unknown[]): void;
  debugData(...arg0: unknown[]): void;
}
