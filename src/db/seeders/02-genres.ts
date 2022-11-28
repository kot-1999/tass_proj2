import {italianModels} from "../models"
import {genres} from "./00-convertData";

export async function up() {
    try {
        const { Genres } = italianModels

        return await Genres.bulkCreate(genres.map((genre) => ({ name: genre})))
    } catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
}

export function down() {
    throw new Error('Not implemented fuction')
}
