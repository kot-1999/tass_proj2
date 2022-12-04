import { models } from "../models/index";
import fs from 'fs'

const scenarists: any[] = JSON.parse(fs.readFileSync('./scripts/scenarist.json', { encoding: 'utf-8' })).map((value: any) => ({
    id: value.scenarist_id,
    fullName: value.full_name,
    gender: value.gender,
    yearOFBirth: value.year_of_birth
}))

export async function up() {
    const { Scenarists } = models
    let a = 0
    const promises: Array<Promise<any>> = []
    for (let b = 2000; b < scenarists.length; a = b, b+=2000) {
        promises.push(Scenarists.bulkCreate(scenarists.slice(a, b)))
    }
    promises.push(Scenarists.bulkCreate(scenarists.slice(a, scenarists.length)))
    return await Promise.all(promises)

}

export function down() {
    throw new Error('Not implemented fuction')
}
