import { forEach } from 'lodash'
import { Sequelize } from 'sequelize'
import * as database from '../../../config/database'
import pg from 'pg'
import 'colors'

// Import define function from database models
import defineMovies from './movies'
import defineMoviesPersons from './moviesPersons'
import defineMovieGenres from './movieGeners'
import defineGenres from './genres'
import defineSubtitles from './subtitles'
import definePersons from './persons'


// Set true because otherwise BIGINT return string instead of integer https://github.com/sequelize/sequelize/issues/1774
pg.defaults.parseInt8 = true


const { italian, global } = database.development

const italianDB = new Sequelize(italian.url, italian.options)
const globalDB = new Sequelize(global.url, global.options)

italianDB
    .authenticate()
    .then(() => console.log('Database IT connection has been established successfully.'.green))
    .catch((e: any) => console.error(`Unable to connect to the database${e}.`.red))

globalDB
    .authenticate()
    .then(() => console.log('Database GL connection has been established successfully.'.green))
    .catch((e: any) => console.error(`Unable to connect to the database${e}.`.red))

const globalModels = {

}

const italianModels = {
    Movies: defineMovies(italianDB),
    MoviesPersons: defineMoviesPersons(italianDB),
    MovieGeners: defineMovieGenres(italianDB),
    Genres: defineGenres(italianDB),
    Subtitles: defineSubtitles(italianDB),
    Persons: definePersons(italianDB),
}

forEach(italianModels, (value) => {
    if (typeof value.associate === 'function') {
        value.associate(italianModels)
    }
})

forEach(globalModels, (value) => {
    if (typeof value.associate === 'function') {
        value.associate(globalModels)
    }
})

type Models = typeof italianModels

export type { Models }
export { italianDB, italianModels }
export default { italianDB }