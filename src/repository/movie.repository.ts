import prisma from "../database/db.js";
import { Movie, InsertMovie } from "../protocols/Movie.js";
import Genre from "../protocols/Genre.js";
import Platform from "../protocols/Platform.js";
import Review from "../protocols/Review.js";



export async function getAllMovies(): Promise<Movie[]>{
    const data = await prisma.movies.findMany()
    return data;
}

export async function getAllGenres(): Promise<Genre[]>{
    const data = await prisma.genres.findMany()
    return data;
}

export async function getAllPlatform(): Promise<Platform[]>{
    const data = await prisma.platforms.findMany()
    return data;
}

export async function getAllReviews(): Promise<Review[]>{
    const data = await prisma.reviews.findMany()
    return data;
}

export async function insertMovie(movie: InsertMovie){
    await prisma.movies.create({
        data:movie
    })
}

export async function getGenreByName(name: string): Promise<Genre>{
    const data = await prisma.genres.findUnique({
        where: {name}
    })
    return data;
}

export async function getPlatformByName(name: string): Promise<Platform>{
    const data = await prisma.platforms.findUnique({
        where: {name}
    })
    return data;
}

export async function insertGenre(name: string){
    await prisma.genres.create({
        data:{name}
    })
}

export async function insertPlatform(name: string){
    await prisma.platforms.create({data: {name}})
}

export async function getMovieById(id: number): Promise<Movie>{
    const data = await prisma.movies.findUnique({where: {id}})
    return data;
}

export async function deleteMovieById(id: number){
    await prisma.movies.delete({where: {id}})
}