import jwt, {Jwt} from 'jsonwebtoken'
import {TokenVerification} from './interface';
import 'dotenv/config';
import * as crypto from "node:crypto";

interface verifyJWTInterface {
    status: true,
    data?: {
        id: number
    }
}


export const test = () => {
    console.log("this is common function")
}

export const signJWT = (data: any): string | undefined | any => {
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

export const verifyJWT = (token: any): TokenVerification => {
    try {
        const verify: Jwt = jwt.verify(token, (process.env.JWT_SECRET_KEY as string), {complete: true});
        console.log("verify", verify);
        //@ts-ignore
        return {status: true, data: {user_id: verify.payload.id}}
    } catch (error) {
        console.log(error)
        //TokenExpiredError
        return {
            status: false,
            data: null
        }
    }
}

export const generateReceiptNumber = (): string => {
    const prefix = 'INV';
    const yearFormat = 'YYYY';
    const digitLength = 6;
    const separator = '-';

    const date = new Date();
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    const randomBytes = crypto.randomBytes(4);
    const randomNum = parseInt(randomBytes.toString('hex'), 16);
    const sequentialNumber = randomNum % Math.pow(10, digitLength);
    const paddedNumber = sequentialNumber.toString().padStart(digitLength, '0');

    return `${prefix}${separator}${year}${month}${separator}${paddedNumber}`;
}

