import { deleteMovieById, deleteReview, getAllGenres, getAllMovies, getAllPlatform, getAllReviews, getGenreByName, getMovieById, getPlatformByName, getScoreByMovieId, insertGenre, insertMovie, insertPlatform, insertReview, updateMovie } from "../repository/movie.repository";
import { Request, Response } from "express";
import { MovieBody } from "../protocols/Movie";
import ReviewBody from "../protocols/Review";

export async function allMovies(req: Request, res: Response) {

    try{
        const result = await getAllMovies();

        res.send(result).status(200)

    }
    catch(err){
        console.error(err)
        if(err.name === "NOT_FOUND"){
            return res.sendStatus(404)
        }
        return res.sendStatus(500)
    }
}

export async function allGenres(req: Request, res: Response) {

    try{
        const result = await getAllGenres();

        res.send(result).status(200)
        
    }
    catch(err){
        console.error(err)
        if(err.name === "NOT_FOUND"){
            return res.sendStatus(404)
        }
        return res.sendStatus(500)
    }
}

export async function allPlatform(req: Request, res: Response) {

    try{
        const result = await getAllPlatform();

        res.send(result).status(200)

    }
    catch(err){
        console.error(err)
        if(err.name === "NOT_FOUND"){
            return res.sendStatus(404)
        }
        return res.sendStatus(500)
    }
}

export async function allReviews(req: Request, res: Response) {

    try{
        const result = await getAllReviews();

        res.send(result).status(200)

    }
    catch(err){
        console.error(err)
        if(err.name === "NOT_FOUND"){
            return res.sendStatus(404)
        }
        return res.sendStatus(500)
    }
}

export async function addMovie(req: Request, res: Response) {
    const newMovie = req.body as MovieBody

    try{
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
    
        res.sendStatus(201)

    }
    catch(err){
        console.error(err)
        return res.sendStatus(500)
    }
}

export async function deleteMovie(req: Request, res: Response) {
    const {id} = req.params;
    
    try{
        const movie = await getMovieById(Number(id));

        if(!id || !movie){
            res.sendStatus(400);
            return;
        }
    
        await deleteMovieById(Number(id))
    
        res.sendStatus(200);

    }
    catch(err){
        console.error(err)
        return res.sendStatus(500)
    }
}

export async function updateStatusMovie(req: Request, res: Response) {
    const {id} = req.params;
    const {score} = req.body as ReviewBody;
    
    try{
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
    catch(err){
        console.error(err)
        return res.sendStatus(500)
    }
}