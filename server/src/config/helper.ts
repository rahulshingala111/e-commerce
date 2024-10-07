import jwt, { Jwt } from 'jsonwebtoken'
import { TokenVerification } from './interface';
import 'dotenv/config'


interface verifyJWTInterface {
    status: true,
    data?: {
        id: number
    }
}


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
            //@ts-ignore
            return { status: true, data: { user_id: verify.payload.id } }
        } catch (error) {
            console.log(error)
            //TokenExpiredError
            return {
                status: false,
                data: null
            }
        }
    }
}
export default new CommonFunction();