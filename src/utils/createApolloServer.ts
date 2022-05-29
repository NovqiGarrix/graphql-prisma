import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import prisma from '../client';
import { UserResolver } from '../resolvers';

export default async function createApolloServer() {
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: false
        }),
        plugins: [process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageGraphQLPlayground()],
        context: (ctx) => ({ ...ctx, prisma })
    })

    return apolloServer
}