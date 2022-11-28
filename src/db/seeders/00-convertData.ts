import fs from 'fs'
import {isNumber, isString} from "lodash";
import {LANGUAGE, ROLE} from "../../utils/enums";
import {number} from "joi";

const moviesData = JSON.parse(fs.readFileSync('./scripts/movies/all_movies.json', { encoding: 'utf-8'}))
const subtitlesData = JSON.parse(fs.readFileSync('./scripts/subtitles/all_subtitles.json', { encoding: 'utf-8'}))

const genres: Array<any> = []
const movieGenres: Array<any> = []
const subtitles: Array<any> = []
const persons: Array<{ primaryName: string, role: ROLE }> = []

const moviesPersons: Array<any> = []

const movies = moviesData.map((movie: any, movieIndex: number) => {

    // Create persons and roles arrays
    const tmpActors = isString(movie?.actors) ? [movie?.actors] : movie?.actors
    const tmpWriters= isString(movie?.writer) ? [movie?.writer] : movie?.writer
    const tmpDirector= isString(movie?.director) ? [movie?.director] : movie?.director

    tmpActors.forEach((actor: string) => {
        if (actor.charAt(0) === ' ') {
            actor = actor.substring(1, actor.length)
        }
        if (actor.charAt(actor.length - 1) === ' ') {
            actor = actor.substring(0, actor.length - 2)
        }

        let personIndex: number = -1
        for (let i = 0; i < persons.length; i+=1) {
            if (persons[i].primaryName === actor && persons[i].role === ROLE.ACTOR) {
                personIndex = i
                break
            }
        }
        if (personIndex === -1) {
            persons.push({primaryName: actor, role: ROLE.ACTOR})
            personIndex = persons.length - 1
        }
        moviesPersons.push({
            movieID: movieIndex + 1,
            personID: personIndex + 1,
        })
    })

    tmpWriters.forEach((writer: string) => {
        if (writer.charAt(0) === ' ') {
            writer = writer.substring(1, writer.length)
        }
        if (writer.charAt(writer.length - 1) === ' ') {
            writer = writer.substring(0, writer.length - 2)
        }
        let personIndex: number = -1
        for (let i = 0; i < persons.length; i+=1) {
            if (persons[i].primaryName === writer && persons[i].role === ROLE.SCENARIST) {
                personIndex = i
                break
            }
        }
        if (personIndex === -1) {
            persons.push({primaryName: writer, role: ROLE.SCENARIST})
            personIndex = persons.length - 1
        }
        moviesPersons.push({
            movieID: movieIndex + 1,
            personID: personIndex + 1

            })
    })

    tmpDirector.forEach((director: string) => {
        if (director.charAt(0) === ' ') {
            director = director.substring(1, director.length)
        }
        if (director.charAt(director.length - 1) === ' ') {
            director = director.substring(0, director.length - 2)
        }
        let personIndex: number = -1
        for (let i = 0; i < persons.length; i+=1) {
            if (persons[i].primaryName === director && persons[i].role === ROLE.DIRECTOR) {
                personIndex = i
                break
            }
        }
        if (personIndex === -1) {
            persons.push({primaryName: director, role: ROLE.DIRECTOR})
            personIndex = persons.length - 1
        }
        moviesPersons.push({
            movieID: movieIndex + 1,
            personID: personIndex + 1

        })
    })


    // Create subtitles array
    subtitlesData.filter((subtitle: any) =>
            subtitle.movieID === movie.imdb_title_id)
        .map((subtitle: any, i: number) => subtitles.push({
            id: i + 1,
            movieID: movieIndex + 1,
            language: LANGUAGE.ITALIAN,
            text: subtitle.text,
            startTime: isNumber(subtitle.start) ? subtitle.start : 0 ,
            endTime: isNumber(subtitle.end) ? subtitle.end : 0,
        }))

    // Add new genres to genres array also generate indexes for movieGenres

    const tmpGenres = isString(movie?.genre) ? [movie?.genre] : movie?.genre

    tmpGenres.forEach((g: string) => {
        let genreIndex: number = genres.indexOf(g.trim())
        if (genreIndex === -1) {
            genres.push(g.trim())
            genreIndex = genres.length - 1
        }
        movieGenres.push({
            genreID: genreIndex + 1,
            movieID: movieIndex + 1
        })
    })

    return {
        name: movie.title,
        description: movie.description.toString(),
        votes: Number(movie.votes) || null,
        rating: Number(movie.avg_vote) || null,
        budget: Number(movie?.budget?.substring(2, movie.budget.length)) || null,
        duration: Number(movie.duration) || null,
        worldWideIncome: Number(movie?.worldWideIncome?.substring(2, movie.worldWideIncome.length)) || null,
        reviewsFromUsers: Number(movie.reviews_from_users) || null,
        reviewsFromCritics: Number(movie.reviews_from_critics) || null,
        published: movie.date_published,
        created: movie.year
    }
})

for (let a = 0; a < moviesPersons.length - 1; a += 1) {
    for (let b = a+1; b < moviesPersons.length; b += 1) {
        if (moviesPersons[a].movieID === moviesPersons[b].movieID && moviesPersons[a].personID === moviesPersons[b].personID) {
            moviesPersons.splice(b, 1)
            a -= 1
            b -= 1
        }
    }
}


export { movies, subtitles, genres, movieGenres, persons, moviesPersons }


export async function up() {
    return await Promise.resolve()
}