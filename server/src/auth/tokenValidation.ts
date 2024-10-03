import { Request, Response, NextFunction } from "express"
import helper from "../config/helper";

const chackIfTokenExist = (req: Request, res: Response, next: NextFunction) => {
    console.log('middleware');
    console.log(req.headers.authorization);
    const token = req.headers.authorization
    if (token) {
        console.log(token);
        const verifyingToken = helper.verifyJWT(token);
        if (verifyingToken.status) {
            console.log("token valid")
            next();
        } else {
            console.log("token expired")
            res.status(200).json({
                code: 911,
                status: false,
                message: "token expired"
            })
        }
    } else {
        next();
    }
}
export default chackIfTokenExist;