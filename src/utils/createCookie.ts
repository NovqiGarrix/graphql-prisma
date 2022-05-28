import { CookieOptions } from "express";
import jwt from "./jwt";

export const createAccessTokenCookie = (data: any, _options?: CookieOptions) => {
    const domain = process.env.DOMAIN ?? "localhost";
    const secure = process.env.NODE_ENV === "production";

    const options: CookieOptions = {
        ...(_options ?? {}),
        domain,
        httpOnly: true,
        secure,
        sameSite: "strict",
        maxAge: 1.8e+6 // 30 minutes
    }

    const access_token = jwt.signJWT(data);

    return {
        access_token, options
    }
}