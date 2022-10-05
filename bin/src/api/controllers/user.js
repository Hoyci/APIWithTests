"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const user_1 = __importDefault(require("../services/user"));
const express_1 = require("../../utils/express");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        try {
            const authResponse = yield user_1.default.auth(token);
            if (!authResponse.error) {
                res.locals.auth = {
                    userId: authResponse.userId
                };
                next();
            }
            else {
                (0, express_1.writeJsonResponse)(res, 401, authResponse);
            }
        }
        catch (err) {
            (0, express_1.writeJsonResponse)(res, 500, { error: { type: 'internal_server_error', message: 'Internal server error' } });
        }
    });
}
exports.auth = auth;
