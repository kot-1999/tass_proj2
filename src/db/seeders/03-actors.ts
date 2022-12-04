import { models } from "../models/index";
import fs from 'fs'

const actors: any[] = JSON.parse(fs.readFileSync('./scripts/actor.json', { encoding: 'utf-8' })).map((value: any) => ({
    id: value.actor_id,
    fullName: value.full_name,
    gender: value.gender,
    yearOFBirth: value.year_of_birth
}))

export async function up() {
    const { Actors } = models
    let a = 0
    const promises: Array<Promise<any>> = []
    for (let b = 2000; b < actors.length; a = b, b+=2000) {
        promises.push(Actors.bulkCreate(actors.slice(a, b)))
    }
    promises.push(Actors.bulkCreate(actors.slice(a, actors.length)))
    return await Promise.all(promises)

}

export function down() {
    throw new Error('Not implemented fuction')
}
