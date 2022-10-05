import { Request, Response, NextFunction } from "express";

import UserService from "../services/user";
import { writeJsonResponse } from "../../utils/express";

export async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization!
    try {
        const authResponse = await UserService.auth(token)
        if (!(authResponse as any).error) {
            res.locals.auth = {
                userId: (authResponse as {userId: string}).userId
            }
            next()
        } else {
            writeJsonResponse(res, 401, authResponse)
        }
    } catch (err){
        writeJsonResponse(res, 500, { error: { type: 'internal_server_error', message: 'Internal Server Error' }})
    }
}