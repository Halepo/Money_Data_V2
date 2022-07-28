export interface Logger {
    logData(...string): void;
    errorData(...string): void;
    infoData(...string): void;
    debugData(...string): void;
}