import { HydratedDocument, model, Schema } from "mongoose";
import { z } from "zod";


const USER_ROLE_SCHEMA = z.enum(['user', 'admin']);

const userRoles = USER_ROLE_SCHEMA.options;

export type USER_ROLE = z.infer<typeof USER_ROLE_SCHEMA>;

export interface IUser {
    name: string;
    email: string;
    passwordHash: string;
    role: USER_ROLE;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        passwordHash: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: userRoles,
            default: 'user',
        },
    },
    { timestamps: true }
)

export type UserDocument = HydratedDocument<IUser>;

export const UserModel = model<IUser>('User', userSchema);
