import { models } from "../models/index";
import fs from 'fs'
import {isArray, random} from "lodash";

const subtitlesTmp: any[] = JSON.parse(fs.readFileSync('./scripts/subtitles_fact.json', { encoding: 'utf-8' })).map((value: any) => ({
    languageID: value.language_id,
    timeID: value.time_id,
    movieID: value.movie_id,
    genreID: value.genre_id, //
    scenaristID: value.scenarist_id, //
    directorID: value.director_id, //
    wordsCount: value.word_count,
    numberOfReplicas: value.number_of_replicas,
    numberOfCharacters: value.number_of_characters
}))

const subtitlesFacts: any[] = []

subtitlesTmp.forEach((subtitle) => {

    const genres: any[] = isArray(subtitle.genreID) ? subtitle.genreID : [subtitle.genreID]
    const scenarists: any[] = isArray(subtitle.scenaristID) ? subtitle.scenaristID : [subtitle.scenaristID]
    const directors: any[] = isArray(subtitle.directorID) ? subtitle.directorID : [subtitle.directorID]

    genres.forEach((genre: any) => {
        scenarists.forEach((scenarist: any) => {
            directors.forEach((director: any) => {
                if (genre != null && genre < 1)
                    genre = null
                subtitlesFacts.push({
                    languageID: subtitle.languageID,
                    timeID: subtitle.timeID,
                    movieID: subtitle.movieID,
                    genreID: genre, //
                    scenaristID: scenarist, //
                    directorID: director, //
                    wordsCount: subtitle.wordsCount,
                    numberOfReplicas: subtitle.numberOfReplicas,
                    numberOfCharacters: subtitle.numberOfCharacters
                })
            })
        })
    })

})

export async function up() {
    const { SubtitlesFacts } = models
    let a = 0
    const promises: Array<Promise<any>> = []
    for (let b = 10000; b < subtitlesFacts.length; a = b, b+=10000) {
        promises.push(SubtitlesFacts.bulkCreate(subtitlesFacts.slice(a, b)))
    }
    promises.push(SubtitlesFacts.bulkCreate(subtitlesFacts.slice(a, subtitlesFacts.length)))
    return await Promise.all(promises)

}

export function down() {
    throw new Error('Not implemented fuction')
}
