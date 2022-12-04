import { models } from "../models/index";
import fs from 'fs'
import {isArray} from "lodash";

const moviesTmp: any[] = JSON.parse(fs.readFileSync('./scripts/movie_fact.json', { encoding: 'utf-8' })).map((value: any) => ({
    timeID: value.time_id,
    movieID: value.movie_id,
    actorID: value.actor_id, //
    genreID: value.genre_id, //
    scenaristID: value.scenarist_id, //
    directorID: value.director_id, //
    budget: value.budget,
    numOfVotes: value.number_of_votes,
    rating: value.rating,
    duration: value.duration
}))

const moviesFacts: any[] = []

moviesTmp.forEach((movie) => {

    const genres: any[] = isArray(movie.genreID) ? movie.genreID : [movie.genreID]
    const scenarists: any[] = isArray(movie.scenaristID) ? movie.scenaristID : [movie.scenaristID]
    const directors: any[] = isArray(movie.directorID) ? movie.directorID : [movie.directorID]
    const actors: any[] = isArray(movie.actorID) ? movie.actorID : [movie.actorID]

    actors.forEach((actor: any) => {
        genres.forEach((genre: any) => {
            scenarists.forEach((scenarist: any) => {
                directors.forEach((director: any) => {
                    moviesFacts.push({
                        timeID: movie.timeID,
                        movieID: movie.movieID,
                        actorID: actor, //
                        genreID: genre, //
                        scenaristID: scenarist, //
                        directorID: director, //
                        budget: movie.budget,
                        numOfVotes: movie.numOfVotes,
                        rating: movie.rating,
                        duration: movie.duration
                    })
                })
            })
        })
    })

})

export async function up() {
    const { MoviesFacts } = models
    let a = 0
    const promises: Array<Promise<any>> = []
    for (let b = 10000; b < moviesFacts.length; a = b, b+=10000) {
        promises.push(MoviesFacts.bulkCreate(moviesFacts.slice(a, b)))
    }
    promises.push(MoviesFacts.bulkCreate(moviesFacts.slice(a, moviesFacts.length)))
    return await Promise.all(promises)

}

export function down() {
    throw new Error('Not implemented fuction')
}
