import { CreateNoteRequestDTO, NoteResponseDTO, UpdateNoteRequestDTO } from "../dtos/note.dto";
import { NoteService } from "../services/note.service";
import { Request, Response } from "express";
import { stringToObjectId } from "../utils/object-id.util";
import { buildNoteFilter, NoteQuerySchema } from "../models/note.model";
import z from "zod";


export class NoteController {
    public constructor(
        private readonly noteService: NoteService) {
    }

    public createNote = async (req: Request, res: Response) => {
        const dto: CreateNoteRequestDTO = req.body;
        const user = req.user;
        const note = await this.noteService.createNote(stringToObjectId(user!.userId), dto);
        res.status(201).json(this.noteService.toNoteResponse(note));
    }

    public updateNote = async (req: Request, res: Response) => {
        const dto: UpdateNoteRequestDTO = req.body;
        const user = req.user;
        const note = await this.noteService.updateNote(stringToObjectId(req.params.noteId as string), stringToObjectId(user!.userId), dto);
        res.status(200).json(this.noteService.toNoteResponse(note!));
    }

    public deleteNote = async (req: Request, res: Response) => {
        const user = req.user;
        await this.noteService.deleteNote(stringToObjectId(req.params.noteId as string), stringToObjectId(user!.userId));
        res.status(204);
    }

    public getNoteById = async (req: Request, res: Response) => {
        const user = req.user;
        const note = await this.noteService.getNoteById(stringToObjectId(req.params.noteId as string), stringToObjectId(user!.userId));
        res.status(200).json(this.noteService.toNoteResponse(note!));
    }

    public getNotesByAuthorId = async (req: Request, res: Response) => {
        const user = req.user;
        const parseResult = NoteQuerySchema.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(400).json({ errors: z.treeifyError(parseResult.error) });
        }
        const params = parseResult.data;
        const notes = await this.noteService.getNotesByAuthorId(stringToObjectId(user!.userId), params);
        res.status(200).json(notes!.map((note) => this.noteService.toNoteResponse(note)));
    }
}