import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import argon from 'argon2';

import { IContext, Res } from '../types';
import { UserModel } from '@src/models/user.model';
import { LoginInput, RegisterInput } from '@src/services/user.service';

import { User } from '@prisma/client';
import createError from '@src/utils/createError';
import { createAccessTokenCookie } from '@src/utils/createCookie';

export type IUserResponse = Res<Omit<User, 'password' | 'uuid'> | null>

@ObjectType()
export class UserResponse implements IUserResponse {

    @Field(() => UserModel, { nullable: true })
    data?: Omit<User, 'password' | 'uuid'>;

    @Field(() => String, { nullable: true })
    error?: string;

    @Field(() => String, { nullable: true })
    access_token?: string;
}

@Resolver()
class UserResolver {

    @Query(() => UserResponse)
    async me(
        @Ctx() { res, prisma }: IContext,
    ): Promise<UserResponse> {
        try {

            const { email } = res.locals
            if (!email) return {
                error: "Hmm... Server said that you're identity is unknown!",
            }

            const user = await prisma.user.findFirst({ where: { email } });

            return {
                data: user ?? undefined
            }

        } catch (error: any) {
            const response = createError(error.message);
            return {
                ...response, access_token: ""
            }
        }
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("input", () => RegisterInput) options: RegisterInput,
        @Ctx() { prisma }: IContext
    ): Promise<IUserResponse> {
        try {
            const hashedPassword = await argon.hash(options.password);

            const { password: _, uuid: _uuid, ...user } = await prisma.user.create({
                data: {
                    ...options, password: hashedPassword, username: options.username.trim()
                }
            })

            const response: IUserResponse = {
                data: user,
            }

            return response

        } catch (error: any) {
            if (error.code === "P2002") {
                const response = createError("Hmm... The server says this user is exist.");
                return response
            }
            const response = createError(error.message);
            return response
        }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("credential", () => LoginInput) input: LoginInput,
        @Ctx() { prisma, res }: IContext
    ): Promise<UserResponse> {
        try {

            const user = await prisma.user.findFirst({ where: { username: input.username } });
            if (!user) {
                const response: UserResponse = { error: "Invalid username or password!" };
                return {
                    ...response, access_token: ""
                }
            }

            const validPassword = await argon.verify(user.password, input.password);
            if (!validPassword) {
                const response: UserResponse = { error: "Invalid username or password!" };
                return {
                    ...response, access_token: ""
                }
            }

            const { access_token, options: cookieOptions } = createAccessTokenCookie({ email: user.email });
            res.cookie('access_token', access_token, cookieOptions);


            return {
                access_token,
                data: user
            }

        } catch (error: any) {
            const response = createError(error.message);
            return {
                ...response, access_token: ""
            }
        }
    }

}

export default UserResolver