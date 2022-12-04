import { models } from "../models/index";
import fs from 'fs'

const languages: any[] = JSON.parse(fs.readFileSync('./scripts/language.json', { encoding: 'utf-8' })).map((value: any) => ({
    id: value.language_id,
    code: value.code
}))

export async function up() {
    const { Languages } = models
    let a = 0
    const promises: Array<Promise<any>> = []
    for (let b = 2000; b < languages.length; a = b, b+=2000) {
        promises.push(Languages.bulkCreate(languages.slice(a, b)))
    }
    promises.push(Languages.bulkCreate(languages.slice(a, languages.length)))
    return await Promise.all(promises)

}

export function down() {
    throw new Error('Not implemented fuction')
}
