import dotenvExtended from "dotenv-extended";
import dotenvParseVariables from "dotenv-parse-variables";

type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'

<<<<<<< HEAD
interface Config {
    mongo: {
        url: string,
        useCreateIndex: boolean,
        autoIndex: boolean
    };
    morganLogger: boolean;
    morganBodyLogger: boolean;
    exmplDevLogger: boolean;
    loggerLevel: LogLevel;

}


=======
>>>>>>> 40c5cc83e4072451c7da3fe5ed9d38fb6736b02f
const env = dotenvExtended.load({
    path: process.env.ENV_FILE,
    defaults: './config/.env.defaults',
    schema: './config/.env.schema',
    includeProcessEnv: true,
    silent: false,
    errorOnMissing: true,
    errorOnExtra: true
});

const parsedEnv = dotenvParseVariables(env)

<<<<<<< HEAD
=======
interface Config {
    morganLogger: boolean;
    morganBodyLogger: boolean;
    exmplDevLogger: boolean;
    loggerLevel: LogLevel
}
>>>>>>> 40c5cc83e4072451c7da3fe5ed9d38fb6736b02f

const config: Config = {
    mongo: {
        url: parsedEnv.MONGO_URL as string,
        useCreateIndex: parsedEnv.MONGO_CREATE_INDEX as boolean,
        autoIndex: parsedEnv.MONGO_AUTO_INDEX as boolean
    },
    morganLogger: parsedEnv.MORGAN_LOGGER as boolean,
    morganBodyLogger: parsedEnv.MORGAN_BODY_LOGGER as boolean,
    exmplDevLogger: parsedEnv.EXMPL_DEV_LOGGER as boolean,
    loggerLevel: parsedEnv.LOGGER_LEVEL as LogLevel
}

export default config