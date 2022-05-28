import jwt from '@src/utils/jwt';
import { Request, Response, NextFunction } from 'express';

const parseToken = (req: Request, res: Response, next: NextFunction): void => {

    const access_token = req.cookies['access_token']
    if (!access_token) return next();

    const isValid = jwt.verifyJWT<{ email: string }>(access_token);
    if (!isValid) return next();

    const { email } = isValid

    res.locals.email = email
    next();

}

export default parseToken