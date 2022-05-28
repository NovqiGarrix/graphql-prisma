import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { decodeBase64 } from './base64';

dotenv.config();

const PRIVATE_KEY = decodeBase64<string>(process.env.JWT_PRIVATE!);
const PUBLIC_KEY = decodeBase64<string>(process.env.JWT_PUBLIC!);

const hello = () => "HELLO";

const signJWT = (data: any): string => {
    return jwt.sign(data, PRIVATE_KEY, { algorithm: 'RS256' });
}

const verifyJWT = <T>(data: string): T | null => {
    try {
        const decoded = jwt.verify(data, PUBLIC_KEY) as T;
        return decoded
    } catch (error) {
        return null
    }
}

export default {
    signJWT, verifyJWT, hello
}