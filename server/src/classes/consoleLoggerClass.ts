import { Logger } from "../interfaces/loggerInterface";

class ConsoleLogger implements Logger {
    logData(...string: any): void {
        console.log(string);
    }
    errorData(...string: any): void {
        console.error(string);
    }
    infoData(...string: any): void {
        console.info(string);
    }
    debugData(...string: any): void {
        console.debug(string);
    }
}

export const logger: Logger = new ConsoleLogger();