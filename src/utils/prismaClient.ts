import { PrismaClient } from '@prisma/client';

export class DbClient {

    public static client: PrismaClient

    public static getClient() {
        if (DbClient.client) {
            return DbClient.client
        }

        const dbClient = new PrismaClient();
        DbClient.client = dbClient

        return DbClient.client
    }

}