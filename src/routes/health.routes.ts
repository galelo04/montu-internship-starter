import { Request, Response, Router } from "express";
import { HealthController } from "../controllers/health.controller";
import { HealthService } from "../services/health.service";

const router = Router();

const healthService = new HealthService();
const healthController = new HealthController(healthService);

router.get('/ping', (req: Request, res: Response) => healthController.ping(req, res));

export default router;