import jwt, { Jwt } from 'jsonwebtoken'
import { TokenVerification } from './interface';
import 'dotenv/config'
class CommonFunction {
    test = () => {
        console.log("this is common function")
    }


    signJWT = (data: any): string | undefined | any => {
        try {
            const token = jwt.sign(data,
                (process.env.JWT_SECRET_KEY as string),
                {
                    expiresIn: '1h',
                    algorithm: 'HS256'
                })
            console.log("token", token);
            return token;
        } catch (error) {
            console.log(error);
        }
    }



    verifyJWT = (token: any): TokenVerification => {
        try {
            const verify: Jwt = jwt.verify(token, (process.env.JWT_SECRET_KEY as string), { complete: true });
            console.log("verify", verify);
            return { status: true }
        } catch (error) {
            console.log(error)
            //TokenExpiredError
            return {
                status: false
            }
        }
    }
}
export default new CommonFunction();