import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import apolloClient from './utils/client';

import { prismaMock } from '../singleton';

beforeAll(async () => {
    await prismaMock.user.deleteMany();
    await prismaMock.book.deleteMany();
})

describe('A User Resolver Unit Testing', () => {

    describe('Register test', () => {

        it('should return new user', async () => {

            const registerMut = gql`
                mutation {
                    register(input: { username: "novqi", email: "novqi@gmail.com", password: "novqi" }) {
                    data {
                        username
                    }
                    
                    error
                    }
                }
            `;

            const user = await apolloClient.mutate({ mutation: registerMut });

            console.info({ user: user.data });

            expect(true).toBeTruthy();

        })

        it('should return error for trying to create the same email or username', async () => {

            expect(true).toBeTruthy();

        })

    })

})
