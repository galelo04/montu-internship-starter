import { HydratedDocument, model, QueryFilter, Schema, Types } from "mongoose";
import { z } from "zod";


export const NOTE_PRIORITY_SCHEMA = z.enum(['high', 'medium', 'low']);
export const NOTE_STATUS_SCHEMA = z.enum(['pending', 'completed']);

const notePriorities = NOTE_PRIORITY_SCHEMA.options;
const noteStatuses = NOTE_STATUS_SCHEMA.options;

export type NOTE_PRIORITY = z.infer<typeof NOTE_PRIORITY_SCHEMA>;
export type NOTE_STATUS = z.infer<typeof NOTE_STATUS_SCHEMA>;

export interface INote {
    title: string;
    content?: string;
    authorId: Types.ObjectId;
    priority?: NOTE_PRIORITY;
    dueDate: Date;
    status?: NOTE_STATUS;
}

const noteSchema = new Schema<INote>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },
        content: {
            type: String,
            trim: true,
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        priority: {
            type: String,
            enum: notePriorities,
            default: 'medium',
        },
        dueDate: { type: Date, required: true },
        status: {
            type: String,
            enum: noteStatuses,
            default: 'pending',
        },
    },
    { timestamps: true }
)

noteSchema.index({ authorId: 1, createdAt: -1 });
noteSchema.index({ authorId: 1, status: 1, createdAt: -1 });
noteSchema.index({ authorId: 1, priority: 1, createdAt: -1 });
noteSchema.index({ authorId: 1, dueDate: 1 });
// fult text search
noteSchema.index({ authorId: 1, title: 'text', content: 'text' });



export type NoteDocument = HydratedDocument<INote>;

export const NoteModel = model<INote>('Note', noteSchema);


export const NoteQuerySchema = z.object({
    search: z.string().optional(),
    status: z.enum(['pending', 'completed']).optional(),
    priority: z.enum(['high', 'medium', 'low']).optional(),
    sortBy: z.enum(['priority', 'createdAt', 'dueDate']).optional(),
    sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export type NoteQueryParams = z.infer<typeof NoteQuerySchema>;

export const buildNoteFilter = (params: NoteQueryParams): QueryFilter<INote> => {
    const filter: QueryFilter<INote> = {};

    if (params.search) {
        filter.$or = [
            { title: { $regex: params.search, $options: 'i' } },
            { content: { $regex: params.search, $options: 'i' } }
        ];
    }

    if (params.status) {
        filter.status = params.status;
    }

    if (params.priority) {
        filter.priority = params.priority;
    }

    return filter;
}
