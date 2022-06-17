import { BadRequestException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { ERROR_MESSENGER_INVALID_PASSWORD, UserRole } from 'constant';
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    referrer?: string;

    @Prop({ required: true, type: String, default: UserRole.USER })
    role: UserRole;

    @Prop()
    updatedAt: Date;

    @Prop()
    createdAt: Date;

    comparePassword: (candidatePassword: string) => Promise<void>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save", async function (this: User, next: CallbackWithoutResultAndOptionalError) {
    const password = this.get("password") as string
    const hashed = await hash(password, 10);
    this.set('password', hashed);

    next();
})

UserSchema.pre("updateOne", async function (this: any, next: CallbackWithoutResultAndOptionalError) {
    const update = this.getUpdate()
    if (update?.password) {
        const password = this.get("password") as string
        const hashed = await hash(password, 10);
        update.password = hashed;
    }

    next();
})


UserSchema.methods['comparePassword'] = async function (candidatePassword: string) {
    const passwordValid = await compare(candidatePassword, this["password"]);

    if (!passwordValid) {
        throw new BadRequestException(ERROR_MESSENGER_INVALID_PASSWORD);
    }
};


