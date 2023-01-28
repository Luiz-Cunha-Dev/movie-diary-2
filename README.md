# Movie-Diary 🎥

Api to save your movie list


## Description

This api was created to be a movie organizer, where you can enter the movies you'd like to watch and the movies you've already watched.</br>
You can also add a score for each movie you watched

## Getting Started

### Dependencies

* cors
* dotenv
* express
* joi
* prisma


## How to run 

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Configure the `.env` file using the `.env.example` file 
4.  Run all migrations (seed db will be executed automatically )

```bash
npx prisma migrate dev
```

5. Run the back-end in a development environment:

```bash
npm run dev
```

## Routes (examples)

Link deploy = https://api-movie-diary.onrender.com
 
</br>

### Insert new movie
```bash
POST: /movies

Body: {
 "imgUrl": "https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg",
 "title": "Os Vingadores",
 "platform": "Netflix",
 "genre": "ação"
 }
```
</br>

### Get all movie
```bash
GET: /movies

[
  {
    "id": 1,
    "imgUrl": "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/89/89/00/20143859.jpg",
    "title": "intocaveis",
    "status": false,
    "platformId": 1,
    "genreId": 5
  },
  {
    "id": 2,
    "imgUrl": "https://br.web.img2.acsta.net/medias/nmedia/18/95/73/93/20425650.jpg",
    "title": "Todo Poderoso",
    "status": false,
    "platformId": 1,
    "genreId": 6
  },
    {...}
]
```
</br>

### Update movie status 
(change status to true and add score)
```bash
PUT: /movies/:id

Body: { "score": 5}
```

</br>

### Update movie status 
(if the movie has true status change the status to false and delete the score)
```bash
PUT: /movies/:id
```

</br>

### Delete a movie
```bash
DELETE: /movies/:id
```
</br>

### Get all genres and movies quantity
```bash
GET: /movies/genres

[
  {
    "id": 1,
    "name": "fantasia",
    "_count": {
      "movies": 3
    }
  },
  {
    "id": 2,
    "name": "ação",
    "_count": {
      "movies": 3
    }
  },
  {...}
]
```

</br>

### Get all platforms and movies quantity
```bash
GET: /movies/platform

[
  {
    "id": 1,
    "name": "Netflix",
    "_count": {
      "movies": 8
    }
  },
  {
    "id": 2,
    "name": "Disney+",
    "_count": {
      "movies": 1
    }
  },
  {...}
]
```

</br>

### Get all reviews
```bash
GET: /movies/reviews

[
  {
    "id": 1,
    "score": 5,
    "movies": {
    "id": 3,
    "title": "O Senhor dos Anéis: A Sociedade do Anel"
    }
  },
  {
    "id": 2,
    "score": 4,
    "movies": {
    "id": 10,
    "title": "Agente Oculto"
    }
  },
  {...}
]
```
</br>

## Authors

Contributors names and contact info

ex. Luiz Miguel da Cunha </br>
ex. [@luiz-Cunha-Dev](https://github.com/Luiz-Cunha-Dev)

</br>

## Version History

* 1.0
    * Initial Release