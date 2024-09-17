import express from 'express';

class UserRoutes {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }
    private initRoutes() {
        this.router.get('/')
    }
}
export default new UserRoutes().router;