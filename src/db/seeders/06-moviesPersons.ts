import {italianModels} from "../models"
import {moviesPersons} from "./00-convertData";

export async function up() {
    try {
        const { MoviesPersons } = italianModels

        return await MoviesPersons.bulkCreate(moviesPersons)
    } catch (err) {
        console.log(err)
        return Promise.reject(err)
    }
}

export function down() {
    throw new Error('Not implemented fuction')
}
