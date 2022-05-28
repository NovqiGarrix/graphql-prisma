import 'reflect-metadata';
import './paths';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compressor from 'compression';

import { Server } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import { DbClient } from '@utils/prismaClient';
import { UserResolver } from '@resolvers/index';
import logger from './utils/logger';

const signals = ["SIGTERM", "SIGINT"];
const PORT = +process.env.PORT! || 3001;
const ORIGIN = process.env.ORIGIN || "http://localhost:3000";

const app = express();
const prisma = DbClient.getClient();

app.use(compressor());
app.use(cors({ credentials: true, origin: [ORIGIN] }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

(async function () {

    let _server: Server | undefined = undefined;

    try {

        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [UserResolver],
                validate: false
            }),
            plugins: [process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageGraphQLPlayground()],
            context: (ctx) => ({ ...ctx, prisma })
        })

        await apolloServer.start();
        apolloServer.applyMiddleware({ app });

        _server = app.listen(PORT, () => {
            logger.info(`🚀 Server started at: http://localhost:${PORT}`);
            logger.info(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
        });


    } catch (error: any) {
        logger.error(error.message);
        await prisma.$disconnect();
        if (_server) (_server as Server).close();

        process.exit(1);
    }

})()

for (const signal of signals) {
    process.on(signal, async () => {
        await prisma.$disconnect();
        logger.info("Database disconnected!")
    })
}