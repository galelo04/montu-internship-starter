import { NoteRepository } from "../repositories/note.repository";
import { buildNoteFilter, INote, NoteDocument, NoteQueryParams } from "../models/note.model";
import { CreateNoteRequestDTO, NoteResponseDTO, UpdateNoteRequestDTO } from "../dtos/note.dto";
import { QueryFilter, Types } from "mongoose";
import { NotFoundError, UnauthorizedError } from "../errors/AppError";
import z from "zod";

export class NoteService {
    public constructor(private readonly noteRepo: NoteRepository) { }
    public async createNote(authorId: Types.ObjectId, data: CreateNoteRequestDTO): Promise<NoteDocument> {
        console.log(data);
        return this.noteRepo.createNote({ ...data, authorId });
    }
    public async updateNote(id: Types.ObjectId, userId: Types.ObjectId, data: UpdateNoteRequestDTO): Promise<NoteDocument | null> {
        const note = await this.noteRepo.updateNote(id, userId, data);
        if (!note) {
            throw new NotFoundError('Note not found');
        }
        return note;
    }
    public async deleteNote(id: Types.ObjectId, userId: Types.ObjectId): Promise<boolean> {
        const result = await this.noteRepo.deleteNote(id, userId);
        if (!result) {
            throw new NotFoundError('Note not found');
        }
        return result;
    }
    public async getNoteById(id: Types.ObjectId, userId: Types.ObjectId): Promise<NoteDocument | null> {
        const note = await this.noteRepo.getNoteById(id, userId);
        if (!note) {
            throw new NotFoundError('Note not found');
        }
        return note;
    }
    public async getNotesByAuthorId(authorId: Types.ObjectId, params: NoteQueryParams): Promise<NoteDocument[] | null> {
        const filter = buildNoteFilter(params);
        let query = this.noteRepo.getNotes({ ...filter, authorId: authorId });
        if (params.sortBy) {
            query = query.sort({ [params.sortBy]: params.sortOrder === 'asc' ? 1 : -1 });
        }
        const notes = await query.exec();
        return notes;
    }

    public toNoteResponse(note: NoteDocument): NoteResponseDTO {
        return {
            id: note._id.toString(),
            title: note.title,
            content: note.content,
            priority: note.priority,
            dueDate: note.dueDate,
            status: note.status,
        };
    }
}