import { Router } from "express";
import { addMovie, allGenres, allMovies, allPlatform, allReviews, deleteMovie } from "../controllers/movie.controllers.js";

const movieRouter = Router();

movieRouter.get("/movies", allMovies)
movieRouter.get("/movies/genres", allGenres)
movieRouter.get("/movies/platform", allPlatform)
movieRouter.get("/movies/reviews", allReviews)

movieRouter.post("/movies", addMovie)

movieRouter.delete("/movies/:id", deleteMovie)

export default movieRouter;