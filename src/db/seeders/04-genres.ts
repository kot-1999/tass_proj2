import { models } from "../models/index";
import fs from 'fs'

const genre: any[] = JSON.parse(fs.readFileSync('./scripts/genre.json', { encoding: 'utf-8' })).map((value: any) => ({
    id: value.genre_id,
    name: value.name
}))

export async function up() {
    const { Genres } = models
    let a = 0
    const promises: Array<Promise<any>> = []
    for (let b = 2000; b < genre.length; a = b, b+=2000) {
        promises.push(Genres.bulkCreate(genre.slice(a, b)))
    }
    promises.push(Genres.bulkCreate(genre.slice(a, genre.length)))
    return await Promise.all(promises)

}

export function down() {
    throw new Error('Not implemented fuction')
}
