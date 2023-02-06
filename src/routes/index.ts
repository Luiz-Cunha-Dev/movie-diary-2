import { Router } from "express";
import movieRouter from "./movies.routes";

const router = Router();
router.use(movieRouter)

export default router;