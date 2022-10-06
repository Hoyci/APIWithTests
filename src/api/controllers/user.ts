import { Request, Response, NextFunction } from "express";

import UserService from "../services/user";
import { writeJsonResponse } from "../../utils/express";
import logger from '../../utils/logger';
import { ErrorResponse } from "../services/user.types";

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

export async function createUser(req: Request, res: Response): Promise<void> {
    const { email, password, name } = req.body;
    
    UserService.createUser(email, password, name)
        .then(resp => {
            if((resp as any).error) {
                if((resp as ErrorResponse).error.type === 'account_already_exists') {
                    writeJsonResponse(res, 409, resp)
                } else {
                    throw new Error(`unsupported ${resp}`)
                }
            } else {
                writeJsonResponse(res, 201, resp)
            }
        })
        .catch((err: any) => {
            logger.error(`createUser: ${err}`)
            writeJsonResponse(res, 500, {
                error: {
                    type: 'internal_server_error',
                    message: 'Internal Server Error'
                }
            })
        })
}