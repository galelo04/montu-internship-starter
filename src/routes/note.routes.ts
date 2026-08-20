import { Router } from 'express';
import { NoteController } from '../controllers/note.controller';
import { NoteService } from '../services/note.service';
import { NoteRepository } from '../repositories/note.repository';
import { validate } from '../middlewares/validate.middleware';
import { CreateNoteBodySchema, UpadteNoteBodySchema } from '../dtos/note.dto';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
const noteRepository = new NoteRepository();
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

router.use(authenticateToken);

router.post('/', validate(CreateNoteBodySchema), (req, res) => noteController.createNote(req, res));
router.put('/:noteId', validate(UpadteNoteBodySchema), (req, res) => noteController.updateNote(req, res));
router.delete('/:noteId', (req, res) => noteController.deleteNote(req, res));
router.get('/:noteId', (req, res) => noteController.getNoteById(req, res));
router.get('/', (req, res) => noteController.getNotesByAuthorId(req, res));

export default router;