import { models } from "../models/index";
import fs from 'fs'

const times: any[] = JSON.parse(fs.readFileSync('./scripts/time.json', { encoding: 'utf-8' })).map((value: any) => ({
    id: value.time_id,
    year: value.year,
    month: value.month,
    date: value.date
}))

export async function up() {
    const { Times } = models
    let a = 0
    const promises: Array<Promise<any>> = []
    for (let b = 2000; b < times.length; a = b, b+=2000) {
        promises.push(Times.bulkCreate(times.slice(a, b)))
    }
    promises.push(Times.bulkCreate(times.slice(a, times.length)))
    return await Promise.all(promises)

}

export function down() {
    throw new Error('Not implemented fuction')
}
