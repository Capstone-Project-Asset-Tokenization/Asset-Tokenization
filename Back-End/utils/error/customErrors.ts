
export class CustomError extends Error {
    statusCode: number

    constructor(statusCode: number = 500, message: string = 'Internal Server Error') {
        super(message)
        this.statusCode = statusCode
    }
}


export class NotFoundError extends CustomError {

    constructor(message = 'Not Found') {
        super(404, message);
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends CustomError {

    constructor(message = 'Bad Request') {
        super(400, message);
        this.name = this.constructor.name;
    }
}

export class UnauthorizedError extends CustomError {

    constructor(message = 'Unauthorized') {
        super(401, message);
        this.name = this.constructor.name;
    }
}

export class ForbiddenError extends CustomError {

    constructor(message = 'Forbidden') {
        super(403, message);
        this.name = this.constructor.name;
    }
}

export class InternalServerError extends CustomError {

    constructor(message = 'Internal Server Error') {
        super(500, message);
        this.name = this.constructor.name;
    }
}
