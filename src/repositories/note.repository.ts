import { Model, QueryFilter, Types } from "mongoose";
import { NoteModel, INote, NoteDocument } from "../models/note.model";
import { UpdateNoteRequestDTO } from "../dtos/note.dto";

export class NoteRepository {
    constructor(private readonly noteModel: Model<INote> = NoteModel) { }

    async createNote(data: INote): Promise<NoteDocument> {
        return this.noteModel.create(data);
    }
    async updateNote(id: Types.ObjectId, userId: Types.ObjectId, data: UpdateNoteRequestDTO): Promise<NoteDocument | null> {
        return this.noteModel.findOneAndUpdate(
            { _id: id, authorId: userId },
            { $set: data },
            { new: true, runValidators: true }
        );
    }
    async deleteNote(id: Types.ObjectId, userId: Types.ObjectId): Promise<boolean> {
        const result = await this.noteModel.deleteOne(
            { _id: id, authorId: userId }
        );
        return result.deletedCount > 0;
    }
    async getNoteById(id: Types.ObjectId, userId: Types.ObjectId): Promise<NoteDocument | null> {
        return this.noteModel.findOne({ _id: id, authorId: userId });
    }
    getNotes(filter: QueryFilter<INote>) {
        return this.noteModel.find(filter);
    }
}