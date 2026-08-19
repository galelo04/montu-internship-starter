import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";
import { RegisterRequestDTO, RegisterResponseDTO } from "../dtos/register.dto";
import { LoginRequestDTO } from "../dtos/login.dto";

export class AuthController {
    public constructor(
        private readonly authService: AuthService) {
    }

    public register = async (req: Request, res: Response) => {
        const dto: RegisterRequestDTO = req.body;
        const user = await this.authService.register(dto);
        const response: RegisterResponseDTO = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
        };
        res.status(201).json(response);
    };

    public login = async (req: Request, res: Response) => {
        const dto: LoginRequestDTO = req.body;
        const result = await this.authService.login(dto);
        res.status(200).json(result);
    };
}
