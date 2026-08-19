import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from "../repositories/user.repository";
import { RegisterRequestDTO } from "../dtos/register.dto";
import { LoginRequestDTO, LoginResponseDTO } from '../dtos/login.dto';
import { UserDocument } from "../models/user.model";
import { config } from '../config';
import { CustomJwtPayload } from "../types/express";
import { DuplicateError, NotFoundError, UnauthorizedError } from '../errors/AppError';

export class AuthService {
    public constructor(private readonly userRepo: UserRepository) { }
    public async register(dto: RegisterRequestDTO): Promise<UserDocument> {
        const user = await this.userRepo.getUserByEmail(dto.email);
        if (user) {
            throw new DuplicateError("User already exists");
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return await this.userRepo.createUser({
            ...dto,
            passwordHash: hashedPassword,
            role: "user",
        });
    }
    public async login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
        const user = await this.userRepo.getUserByEmail(dto.email);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid password");
        }
        const payload: CustomJwtPayload = { userId: user._id.toString(), role: user.role };

        const accessToken = jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'],
        });
        const refreshToken = jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'],
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    public refreshToken() { }
    public logout() { }
}