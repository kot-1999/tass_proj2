import {italianModels} from "../models"
import {movies} from "./00-convertData";

export async function up() {
    try {
        const { Movies } = italianModels

        return await Movies.bulkCreate(movies)
    } catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
}

export function down() {
    throw new Error('Not implemented fuction')
}
