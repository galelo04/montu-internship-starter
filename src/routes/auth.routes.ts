import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';
import { validate } from '../middlewares/validate.middleware';
import { RegisterBodySchema } from '../dtos/register.dto';
import { LoginBodySchema } from '../dtos/login.dto';

const router = Router();
const authRepository = new UserRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post('/register', validate(RegisterBodySchema), (req, res) => authController.register(req, res));
router.post('/login', validate(LoginBodySchema), (req, res) => authController.login(req, res));

export default router;