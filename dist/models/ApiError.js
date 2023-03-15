"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(name, statusCode, message) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
    update(name, statusCode, message) {
        if (name)
            this.name = name;
        if (statusCode)
            this.statusCode = statusCode;
        if (message)
            this.message = message;
    }
}
exports.ApiError = ApiError;
