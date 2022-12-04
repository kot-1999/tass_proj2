import { models } from "../models/index";
import fs from 'fs'

const movies: any[] = JSON.parse(fs.readFileSync('./scripts/movie.json', { encoding: 'utf-8' })).map((value: any) => ({
    id: value.time_id,
    name: value.name,
    country: value.country
}))

export async function up() {
    const { Movies } = models
    let a = 0
    const promises: Array<Promise<any>> = []
    for (let b = 2000; b < movies.length; a = b, b+=2000) {
        promises.push(Movies.bulkCreate(movies.slice(a, b)))
    }
    promises.push(Movies.bulkCreate(movies.slice(a, movies.length)))
    return await Promise.all(promises)

}

export function down() {
    throw new Error('Not implemented fuction')
}
