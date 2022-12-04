import { models } from "../models/index";
import fs from 'fs'

const directors: any[] = JSON.parse(fs.readFileSync('./scripts/director.json', { encoding: 'utf-8' })).map((value: any) => ({
    id: value.director_id,
    fullName: value.full_name,
    gender: value.gender,
    yearOFBirth: value.year_of_birth
}))

export async function up() {
    const { Directors } = models
    let a = 0
    const promises: Array<Promise<any>> = []
    for (let b = 2000; b < directors.length; a = b, b+=2000) {
        promises.push(Directors.bulkCreate(directors.slice(a, b)))
    }
    promises.push(Directors.bulkCreate(directors.slice(a, directors.length)))
    return await Promise.all(promises)

}

export function down() {
    throw new Error('Not implemented fuction')
}
