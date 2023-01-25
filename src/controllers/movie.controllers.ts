import { getAllMovies } from "../repository/movie.repository.js";
import { Request, Response } from "express";

export async function allMovies(req: Request, res: Response) {
    const result = await getAllMovies();

    res.send(result).status(200)
}