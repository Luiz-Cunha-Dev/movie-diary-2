import prisma from "../src/database/db.js";

async function main(){
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

    await prisma.movies.createMany({
        data: [
          {
            "imgUrl": "https://br.web.img2.acsta.net/medias/nmedia/18/92/91/47/20224867.jpg",
            "title": "O Senhor dos Anéis: O Retorno do Rei",
            "platformId": 1,
            "genreId": 1
          },
          {
            "imgUrl": "https://br.web.img2.acsta.net/medias/nmedia/18/92/34/89/20194741.jpg",
            "title": "O Senhor dos Anéis: As Duas Torres",
            "platformId": 1,
            "genreId": 1
          },
          {
            "imgUrl": "https://br.web.img3.acsta.net/medias/nmedia/18/92/91/32/20224832.jpg",
            "title": "O Senhor dos Anéis: A Sociedade do Anel",
            "platformId": 1,
            "genreId": 1
          },
          {
            "imgUrl": "https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg",
            "title": "Vingadores",
            "platformId": 2,
            "genreId": 2
          },
          {
            "imgUrl": "https://br.web.img3.acsta.net/medias/nmedia/18/87/90/87/19981177.jpg",
            "title": "Tekken",
            "platformId": 1,
            "genreId": 3
          },
          {
            "imgUrl": "https://br.web.img3.acsta.net/pictures/21/04/20/21/23/0906471.jpg",
            "title": "O mistério da casa assombrada",
            "platformId": 1,
            "genreId": 4
          },
          {
            "imgUrl": "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/89/89/00/20143859.jpg",
            "title": "intocaveis",
            "platformId": 1,
            "genreId": 5
          }
        ]
    })
}

main()
.then(() => {
    console.log("Registro feito com sucesso!");
    
})
.catch(e => {
    console.error(e);
    process.exit(1)
})
.finally(async () => await prisma.$disconnect())