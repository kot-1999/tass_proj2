import { forEach } from 'lodash'
import { Sequelize } from 'sequelize'
import * as database from '../../../config/database'
import pg from 'pg'
import 'colors'

// Import define function from database models
import defineMoviesFacts from './moviesFacts'
import defineSubtitlesFacts from './subtitlesFacts'
import defineActors from './actors'
import defineScenarists from './scenarists'
import defineDirectors from './directors'
import defineTimes from './times'
import defineMovies from './movies'
import defineGenres from './genres'
import defineSubtitles from './subtitles'


// Set true because otherwise BIGINT return string instead of integer https://github.com/sequelize/sequelize/issues/1774
pg.defaults.parseInt8 = true


const { url, options } = database.development

const models = new Sequelize(url, options)

models
    .authenticate()
    .then(() => console.log('Database GL connection has been established successfully.'.green))
    .catch((e: any) => console.error(`Unable to connect to the database${e}.`.red))

const modelTypes = {
    MoviesFacts: defineMoviesFacts(models),
    SubtitlesFacts: defineSubtitlesFacts(models),
    Actors: defineActors(models),
    Scenarists: defineScenarists(models),
    Directors: defineDirectors(models),
    Genres: defineGenres(models),
    Subtitles: defineSubtitles(models),
    Times: defineTimes(models),
    Movies: defineMovies(models)

}

forEach(modelTypes, (value) => {
    if (typeof value.associate === 'function') {
        value.associate(modelTypes)
    }
})


type Models = typeof modelTypes

export type { Models }
export { models, modelTypes }
export default models