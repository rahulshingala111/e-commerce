import {Request, Response, NextFunction} from "express"
import {verifyJWT} from "../config/helper";

const checkIfTokenExist = (req: Request, res: Response, next: NextFunction) => {
    console.log('middleware');
    console.log(req.headers.authorization);
    const token = req.headers.authorization
    if (token) {
        console.log(token);
        const verifyingToken = verifyJWT(token);
        if (verifyingToken.status) {
            console.log("token valid")
            req.body.user_id = verifyingToken.data?.user_id
            console.log(req.body.user_id, verifyingToken.data?.user_id);
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
        res.status(200).json({
            code: 911,
            status: false,
            message: "no token found"
        })
    }
}
export default checkIfTokenExist;
