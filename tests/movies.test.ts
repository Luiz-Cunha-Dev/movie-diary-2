import app from "../src/server";
import supertest from "supertest";
import prisma from "database/db";

const api = supertest(app)

beforeAll(async () => {
    await prisma.reviews.deleteMany()
    await prisma.movies.deleteMany()
    await prisma.genres.deleteMany()
    await prisma.platforms.deleteMany()
})

beforeEach(async () => {
    await prisma.platforms.createMany({
        data: [
          {name: "Netflix"},
          {name: "Disney+"}
        ]
      })

    await prisma.genres.createMany({
      data: [
        {name: "fantasia"},
        {name: "ação"},
        {name: "luta"},
        {name: "terror"},
        {name: "drama"}
      ]
    })

    const platforms = await prisma.platforms.findMany()
    const genres = await prisma.genres.findMany()

    await prisma.movies.createMany({
        data: [
          {
            "imgUrl": "https://br.web.img2.acsta.net/medias/nmedia/18/92/91/47/20224867.jpg",
            "title": "O Senhor dos Anéis: O Retorno do Rei",
            "platformId": platforms[0].id,
            "genreId": genres[0].id
          },
          {
            "imgUrl": "https://br.web.img2.acsta.net/medias/nmedia/18/92/34/89/20194741.jpg",
            "title": "O Senhor dos Anéis: As Duas Torres",
            "platformId": platforms[0].id,
            "genreId": genres[0].id
          },
          {
            "imgUrl": "https://br.web.img3.acsta.net/medias/nmedia/18/92/91/32/20224832.jpg",
            "title": "O Senhor dos Anéis: A Sociedade do Anel",
            "platformId": platforms[0].id,
            "genreId": genres[0].id
          },
          {
            "imgUrl": "https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg",
            "title": "Vingadores",
            "platformId": platforms[1].id,
            "genreId": genres[1].id
          },
          {
            "imgUrl": "https://br.web.img3.acsta.net/medias/nmedia/18/87/90/87/19981177.jpg",
            "title": "Tekken",
            "platformId": platforms[0].id,
            "genreId": genres[2].id
          },
          {
            "imgUrl": "https://br.web.img3.acsta.net/pictures/21/04/20/21/23/0906471.jpg",
            "title": "O mistério da casa assombrada",
            "platformId": platforms[0].id,
            "genreId": genres[3].id
          },
          {
            "imgUrl": "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/89/89/00/20143859.jpg",
            "title": "intocaveis",
            "platformId": platforms[0].id,
            "genreId": genres[4].id
          }
        ]
    })
})

afterEach(async () => {
    await prisma.reviews.deleteMany()
    await prisma.movies.deleteMany()
    await prisma.genres.deleteMany()
    await prisma.platforms.deleteMany()
})

describe("GET /movies", () => {
     

    it('should respond with status 200', async () => {
        const result = await api.get("/movies")
        expect(result.status).toBe(200)
    });

    it('should respond with status 404', async () => {
        await prisma.movies.deleteMany()
        const result = await api.get("/movies")
        expect(result.status).toBe(404)
    });

})

describe("POST /movies", () => {
     

    it('should respond with status 201', async () => {
        const result = await api.post("/movies").send({
            "imgUrl": "https://br.web.img3.acsta.net/pictures/22/05/24/16/14/3798761.png",
            "title":"Agente Oculto",
            "platform": "Netflix",
            "genre": "ação"
            })
        expect(result.status).toBe(201)
    });

    it('should respond with status 422', async () => {
        const result = await api.post("/movies")
        expect(result.status).toBe(422)
    });
})


describe("DELETE /movies/:id", () => {
     

    it('should respond with status 200', async () => {
        const movies = await prisma.movies.findMany()
        const result = await api.delete(`/movies/${movies[0].id}`)
        expect(result.status).toBe(200)
    });

    it('should respond with status 400', async () => {
        const result = await api.delete("/movies/0")
        expect(result.status).toBe(400)
    });
})

describe("PUT /movies/:id", () => {
     

    it('should respond with status 200', async () => {
        const movies = await prisma.movies.findMany()
        const result = await api.put(`/movies/${movies[0].id}`).send({score: 5})
        expect(result.status).toBe(200)
    });

    it('should respond with status 400', async () => {
        const result = await api.put("/movies/0")
        expect(result.status).toBe(400)
    });
})


describe("GET /movies/genres", () => {
     

    it('should respond with status 200', async () => {
        const result = await api.get("/movies/genres")
        expect(result.status).toBe(200)
    });

    it('should respond with status 404', async () => {
        await prisma.movies.deleteMany()
        await prisma.genres.deleteMany()
        const result = await api.get("/movies/genres")
        expect(result.status).toBe(404)
    });
})

describe("GET /movies/platform", () => {
     

    it('should respond with status 200', async () => {
        const result = await api.get("/movies/platform")
        expect(result.status).toBe(200)
    });

    it('should respond with status 404', async () => {
        await prisma.movies.deleteMany()
        await prisma.platforms.deleteMany()
        const result = await api.get("/movies/platform")
        expect(result.status).toBe(404)
    });
})

describe("GET /movies/reviews", () => {
     

    it('should respond with status 200', async () => {
        const movies = await prisma.movies.findMany()
        await prisma.reviews.create({
            data: {
                score: 5,
                movieId: movies[0].id
            }
        })
        const result = await api.get("/movies/reviews")
        expect(result.status).toBe(200)
    });

    it('should respond with status 404', async () => {
        const result = await api.get("/movies/reviews")
        expect(result.status).toBe(404)
    });
})