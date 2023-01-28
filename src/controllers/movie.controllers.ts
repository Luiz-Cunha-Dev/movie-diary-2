import { deleteMovieById, deleteReview, getAllGenres, getAllMovies, getAllPlatform, getAllReviews, getGenreByName, getMovieById, getPlatformByName, getScoreByMovieId, insertGenre, insertMovie, insertPlatform, insertReview, updateMovie } from "../repository/movie.repository.js";
import { Request, Response } from "express";
import { MovieBody } from "../protocols/Movie.js";
import ReviewBody from "../protocols/Review.js";

export async function allMovies(req: Request, res: Response) {
    const result = await getAllMovies();

    res.send(result).status(200)
}

export async function allGenres(req: Request, res: Response) {
    const result = await getAllGenres();

    res.send(result).status(200)
}

export async function allPlatform(req: Request, res: Response) {
    const result = await getAllPlatform();

    res.send(result).status(200)
}

export async function allReviews(req: Request, res: Response) {
    const result = await getAllReviews();

    res.send(result).status(200)
}

export async function addMovie(req: Request, res: Response) {
    const newMovie = req.body as MovieBody

    let genre = await getGenreByName(newMovie.genre)
    
    if(genre === null){
        await insertGenre(newMovie.genre)
        genre = await getGenreByName(newMovie.genre)
    }

    let platform = await getPlatformByName(newMovie.platform)
    
    if(platform === null){
        await insertPlatform(newMovie.platform)
        platform = await getPlatformByName(newMovie.platform)
    }

    await insertMovie({
        imgUrl: newMovie.imgUrl,
        title: newMovie.title,
        platformId: platform.id,
        genreId: genre.id
    });

    res.sendStatus(200)
}

export async function deleteMovie(req: Request, res: Response) {
    const {id} = req.params;
    
    const movie = await getMovieById(Number(id));

    if(!id || !movie){
        res.sendStatus(400);
        return;
    }

    await deleteMovieById(Number(id))

    res.sendStatus(200);
}

export async function updateStatusMovie(req: Request, res: Response) {
    const {id} = req.params;
    const {score} = req.body as ReviewBody;
    
    const movie = await getMovieById(Number(id));

    if(!id || !movie){
        res.sendStatus(400);
        return;
    }

    const existingScore = await getScoreByMovieId(Number(id))

    if(existingScore){
        await deleteReview(Number(id))
        await updateMovie(Number(id), false)
        res.sendStatus(200);
        return
    }

    if(!score){
        res.sendStatus(400)
        return
    }

    await updateMovie(Number(id), true)
    await insertReview(Number(id), score)

    res.sendStatus(200);
}