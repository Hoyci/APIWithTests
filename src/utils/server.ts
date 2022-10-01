import bodyParser from "body-parser";
import express from "express";
import { Express, Request, Response, NextFunction } from "express-serve-static-core";
import morgan from "morgan";
import morganBody from "morgan-body";
import * as OpenApiValidator from "express-openapi-validator";
import { connector, summarise } from "swagger-routes-express";
import YAML from 'yamljs';
import * as api from '@mareblog/api/controllers'
import { expressDevLogger } from "./express_dev_logger";
import config from "@mareblog/config"


export async function createServer(): Promise<Express> {
    const yamlSpecFile = './config/openapi.yml';
    const apiDefinition = YAML.load(yamlSpecFile);
    const apiSummary = summarise(apiDefinition);
    console.log('Summary API', apiSummary);

    const server = express();
    server.use(bodyParser.json());
    if (config.morganLogger){
        server.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
    }

    if (config.morganBodyLogger) {
        morganBody(server);
    }

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
            console.log(`${method}: ${descriptor.map((d: any) => d.name).join(', ')}`);
        },
        security: {
            bearerAuth: api.auth
        }
    });

    connect(server);
    return server
};
