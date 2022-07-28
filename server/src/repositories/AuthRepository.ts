import { db } from 'src/config/database';
import { ObjectId } from 'bson';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { logger } from '../classes/consoleLoggerClass';

//check the interface implementation.... //implements IProgram<Program>
export class AuthRepository {
    public async anotherOne(email: string, password: string): Promise<any> {
        logger.infoData("Logging in..");
        let result = await db.collection('Program').findOneAndUpdate({
            _id: new ObjectId('000'),
        }, {
            $push: {
                'something': "something"
            },
        }, { upsert: true, returnOriginal: false });
        return result;
    }

    public async login(email: string, password: string): Promise<any> {
        console.log(db)
        logger.infoData("Logging in..");
        let user = await db.collection('users').findOne({ email: email });
        console.log(user)
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create tokens
            const token = jwt.sign(
                { user_id: user._id, role: user.role, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h",
                }
            );
            const refreshToken = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
                expiresIn: "24h",
            });

            let resUser = { user, token, refreshToken }
            return resUser
        }
    }
    public async register(email: string, password: string): Promise<any> {
        console.log(db)
        logger.infoData("Logging in..");
        let user = await db.collection('users').findOne({ email: email });
        console.log(user)
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create tokens
            const token = jwt.sign(
                { user_id: user._id, role: user.role, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h",
                }
            );
            const refreshToken = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
                expiresIn: "24h",
            });

            let resUser = { user, token, refreshToken }
            return resUser
        }
    }
}