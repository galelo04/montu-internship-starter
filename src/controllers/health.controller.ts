import { Request, Response } from "express";
import { HealthService } from "../services/health.service";

export class HealthController {
    constructor(private healthService: HealthService) { }

    public ping(_req: Request, res: Response) {
        const result = this.healthService.ping();
        res.status(200).json(result);
    }
}