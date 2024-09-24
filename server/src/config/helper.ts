import jwt from 'jsonwebtoken'
class CommonFunction {
    test = () => {
        console.log("this is common function")
    }


    signJWT = (data: any): string | undefined | any => {
        try {
            const token = jwt.sign(data,
                "asdljfghalsjidfbal234sijdfbas234dbfas234",
                {
                    expiresIn: '1h',
                    algorithm: 'HS256',
                })
            console.log("token", token);
            return token;
        } catch (error) {
            console.log(error);
        }
    }

    verifyJWT = (token: any): string | jwt.JwtPayload | undefined => {
        try {
            const verify: string | jwt.JwtPayload = jwt.verify(token, "asdljfghalsjidfbal234sijdfbas234dbfas234");
            console.log("verify", verify);
            return verify
        } catch (error) {
            console.log(error);

        }
    }
}
export default new CommonFunction();