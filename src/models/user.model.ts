import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class UserModel {

    @Field(() => Int)
    id!: number;

    uuid!: string;

    password!: string;

    @Field(() => String)
    username!: string;

    @Field(() => String)
    email!: string;

    @Field(() => String)
    createdAt!: string;

    @Field(() => String)
    updatedAt!: string;

}