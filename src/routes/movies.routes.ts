import { Router } from "express";
import { allMovies } from "../controllers/movie.controllers.js";

const movieRouter = Router();

movieRouter.get("/movies", allMovies)

export default movieRouter;