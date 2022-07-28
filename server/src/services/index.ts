import { AuthRepository } from 'src/repositories/AuthRepository';
import { logger } from '../classes/consoleLoggerClass';

export class Service {
    private authRepository = new AuthRepository();

    public async login(
        email: string,
        password: string,
    ) {
        try {
            const loggedInUser = await this.authRepository.login(email, password)
            if (loggedInUser) return loggedInUser;
        } catch (error) {
            logger.errorData('error data:', error);
        }
    }

}