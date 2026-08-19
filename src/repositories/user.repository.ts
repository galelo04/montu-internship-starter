import { Model } from "mongoose";
import { UserModel, IUser, UserDocument } from "../models/user.model";

export class UserRepository {
    constructor(private readonly userModel: Model<IUser> = UserModel) { }

    async createUser(data: IUser): Promise<UserDocument> {
        return this.userModel.create(data);
    }
    async getUserById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id);
    }
    async getUserByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email });
    }
    async updateUser(id: string, data: IUser): Promise<UserDocument | null> {
        return this.userModel.findByIdAndUpdate(id, data)
    }
}