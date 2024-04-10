import { Request, Response, NextFunction } from 'express'
export const catchAsyncError = (cb: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(cb(req, res, next)).catch(error => {
            next(error)
        })
    }
}

