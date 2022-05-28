import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export interface IContext {
    req: Request,
    res: Response,
    prisma: PrismaClient
}

export interface Res<T> {
    data?: T
    error?: string;
}