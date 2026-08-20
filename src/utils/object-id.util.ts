import { Types } from 'mongoose';
import { BadRequestError } from '../errors/AppError';

export const stringToObjectId = (id: string): Types.ObjectId => {
    if (Types.ObjectId.isValid(id) && String(new Types.ObjectId(id)) === id) {
        return new Types.ObjectId(id);
    }
    throw new BadRequestError('Invalid ObjectId');
}