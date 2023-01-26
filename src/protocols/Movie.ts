export type Movie = {
    id: number,
    title: string,
    status: boolean,
    platformId: number,
    genreId: number
}

export type InsertMovie = Omit<Movie, "id" | "status">

export type MovieBody = {
    title: string,
    platform: string,
    genre: string
}