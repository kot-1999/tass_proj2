import {italianModels} from "../models"
import { subtitles } from "./00-convertData";

export async function up() {
    try {
        const { Subtitles } = italianModels
        let a = 0
        const promises: Array<Promise<any>> = []
        for (let b = 2000; b < subtitles.length; a = b, b+=2000) {
            promises.push(Subtitles.bulkCreate(subtitles.slice(a, b)))
        }
        promises.push(Subtitles.bulkCreate(subtitles.slice(a, subtitles.length)))
        return await Promise.all(promises)
    } catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
}

export function down() {
    throw new Error('Not implemented fuction')
}
