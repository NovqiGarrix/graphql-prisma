import 'cross-fetch/polyfill';

import ApolloClient from 'apollo-boost';
import dotenv from 'dotenv';

dotenv.config();

const client = new ApolloClient({
    uri: `${process.env.BASE_URL}/graphql`,
    onError: (e) => console.error(e.graphQLErrors)
})

export default client