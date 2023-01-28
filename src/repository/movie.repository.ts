import { join } from "@prisma/client/runtime/index.js";
import prisma from "../database/db.js";
import {InsertMovie} from "../protocols/Movie.js";

export async function getAllMovies(){
    const data = await prisma.movies.findMany({
        include:{
            genres:{
                select:{
                    name:true
                }
            },
            platforms:{
                select:{
                    name:true
                }
            },            reviews:{
                select:{
                    score:true
                }
            }
        }
    })
    data.map(m => delete m.platformId && delete m.genreId)
    return data;
}

export async function getAllGenres(){
    const data = await prisma.genres.findMany({
        select:{
            id:true,
            name:true,
            _count:{
                select:{movies:true}
            }
        }
    })
    return data;
}

export async function getAllPlatform(){
    const data = await prisma.platforms.findMany({
        select:{
            id:true,
            name:true,
            _count:{
                select:{movies:true}
            }
        }
    })
    return data;
}

export async function getAllReviews(){
    const data = await prisma.reviews.findMany({
        include:{
            movies:{
                select:{
                    id:true,
                    title:true
                }
            }
        }
    })
    data.map(r => delete r.movieId)
    return data;
}

export async function insertMovie(movie: InsertMovie){
    await prisma.movies.create({
        data:movie
    })
}

export async function getGenreByName(name: string){
    const data = await prisma.genres.findUnique({
        where: {name}
    })
    return data;
}

export async function getPlatformByName(name: string){
    const data = await prisma.platforms.findUnique({
        where: {name}
    })
    return data;
}

export async function getScoreByMovieId(movieId: number){
    const data = await prisma.reviews.findUnique({
        where: {movieId}
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

export async function getMovieById(id: number){
    const data = await prisma.movies.findUnique({where: {id}})
    return data;
}

export async function deleteMovieById(id: number){
    await prisma.movies.delete({where: {id}})
}

export async function deleteReview(movieId: number){
    await prisma.reviews.delete({where: {movieId}})
}

export async function updateMovie(id: number, status: boolean){
    await prisma.movies.update({
        where: {id},
        data:{status}
    })
}

export async function insertReview(movieId: number, score: number){
    await prisma.reviews.create({data: {movieId, score}})
}