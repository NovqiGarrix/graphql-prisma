import { Field, InputType } from 'type-graphql';

// Containing complicated functions

@InputType()
export class RegisterInput {

    @Field(() => String)
    username!: string;

    @Field(() => String)
    email!: string;

    @Field(() => String)
    password!: string;

}

@InputType()
export class LoginInput {

    @Field(() => String)
    username!: string;

    @Field(() => String)
    password!: string;

}