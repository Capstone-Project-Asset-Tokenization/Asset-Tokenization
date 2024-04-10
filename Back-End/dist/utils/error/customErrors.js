"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.NotFoundError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode = 500, message = 'Internal Server Error') {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
class NotFoundError extends CustomError {
    constructor(message = 'Not Found') {
        super(404, message);
        this.name = this.constructor.name;
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends CustomError {
    constructor(message = 'Bad Request') {
        super(400, message);
        this.name = this.constructor.name;
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends CustomError {
    constructor(message = 'Unauthorized') {
        super(401, message);
        this.name = this.constructor.name;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends CustomError {
    constructor(message = 'Forbidden') {
        super(403, message);
        this.name = this.constructor.name;
    }
}
exports.ForbiddenError = ForbiddenError;
class InternalServerError extends CustomError {
    constructor(message = 'Internal Server Error') {
        super(500, message);
        this.name = this.constructor.name;
    }
}
exports.InternalServerError = InternalServerError;
