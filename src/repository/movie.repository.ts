import prisma from "../database/db.js";


export async function getAllMovies(){
    return prisma.movies.findMany();
}