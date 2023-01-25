import { Router } from "express";
import movieRouter from "./movies.routes.js";

const router = Router();
router.use(movieRouter)

export default router;