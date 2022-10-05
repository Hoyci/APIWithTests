import express from "express";
import { Express, Request, Response, NextFunction } from "express-serve-static-core";
import morgan from "morgan";
import morganBody from "morgan-body";
import * as OpenApiValidator from "express-openapi-validator";
import { connector, summarise } from "swagger-routes-express";
import YAML from 'yamljs';
import * as api from '../api/controllers';
import { expressDevLogger } from "./express_dev_logger";
import config from "../../config/index";
<<<<<<< HEAD
import logger from '../utils/logger';
=======
>>>>>>> 40c5cc83e4072451c7da3fe5ed9d38fb6736b02f


export async function createServer(): Promise<Express> {
    const yamlSpecFile = './config/openapi.yml';
    const apiDefinition = YAML.load(yamlSpecFile);
    const apiSummary = summarise(apiDefinition);
    logger.info(apiSummary);

    const server = express();
<<<<<<< HEAD
    server.use(express.json());
    
     /* istanbul ignore next */
=======
    server.use(bodyParser.json()); // this can be changed for express.json()
    console.log(config)
>>>>>>> 40c5cc83e4072451c7da3fe5ed9d38fb6736b02f
    if (config.morganLogger){
        server.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
    }
     /* istanbul ignore next */
    if (config.morganBodyLogger) {
        morganBody(server);
    }
     /* istanbul ignore next */
    if (config.exmplDevLogger) {
        server.use(expressDevLogger);
    }

    const validatorOptions = {
        apiSpec: yamlSpecFile,
        validateRequests: true,
        validateResponses: true
    };

    server.use(OpenApiValidator.middleware(validatorOptions));
    server.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status).json({
            error: {
                type: 'request_validation',
                message: err.message,
                errors: err.errors
            }
        })
    });

    const connect = connector(api, apiDefinition, {
        onCreateRoute: (method: string, descriptor: any[]) => {
            descriptor.shift()
            logger.verbose(`${method}: ${descriptor.map((d: any) => d.name).join(', ')}`);
        },
        security: {
            bearerAuth: api.auth
        }
    });

    connect(server);
    return server
};
