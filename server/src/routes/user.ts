import express, { Router, Request, Response } from "express";

const router: Router = express.Router();
// POST /user/signin
router.post('/signin', async (req: Request, res: Response) => {
    try {
        res.send('OK');
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

export default router;