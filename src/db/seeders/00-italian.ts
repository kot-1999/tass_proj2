import 'colors'
import { Sequelize } from "sequelize";

export async function up() {

    const italianDB = new Sequelize(process.env.ITALIAN_URL)

    italianDB.authenticate()
        .then(() => console.log('Database GL connection has been established successfully.'.green))
        .catch((e: any) => console.error(`Unable to connect to the database${e}.`.red))

    const movies = await italianDB.query('SELECT * FROM movies;')
    console.log(movies[0].length)
    return await Promise.resolve()
}

export function down() {
    throw new Error('Not implemented fuction')
}
