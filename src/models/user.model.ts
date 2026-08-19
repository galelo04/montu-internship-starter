import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    passwordHash: string;
    role: string;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
)

export type UserDocument = HydratedDocument<IUser>;

export const UserModel = model<IUser>('User', userSchema);
