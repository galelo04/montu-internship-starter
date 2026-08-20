import { NOTE_PRIORITY, NOTE_PRIORITY_SCHEMA, NOTE_STATUS, NOTE_STATUS_SCHEMA } from '../models/note.model';
import { z } from 'zod';

export const CreateNoteBodySchema = z.object({
    title: z.string().nonempty(),
    content: z.string().optional(),
    priority: NOTE_PRIORITY_SCHEMA.optional(),
    dueDate: z.coerce.date(),
});

export const UpadteNoteBodySchema = z.object({
    title: z.string().nonempty().optional(),
    content: z.string().optional(),
    priority: NOTE_PRIORITY_SCHEMA.optional(),
    status: NOTE_STATUS_SCHEMA.optional(),
    dueDate: z.coerce.date().optional(),
});

export interface NoteResponseDTO {
    title: string;
    content?: string;
    priority?: NOTE_PRIORITY;
    dueDate: Date;
    status?: NOTE_STATUS;
    id: string;
}


export type CreateNoteRequestDTO = z.infer<typeof CreateNoteBodySchema>;
export type UpdateNoteRequestDTO = z.infer<typeof UpadteNoteBodySchema>;