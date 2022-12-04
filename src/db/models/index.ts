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
import defineSubtitles from './languages'


// Set true because otherwise BIGINT return string instead of integer https://github.com/sequelize/sequelize/issues/1774
pg.defaults.parseInt8 = true


const { url, options } = database.development

const seq = new Sequelize(url, options)

seq
    .authenticate()
    .then(() => console.log('Database GL connection has been established successfully.'.green))
    .catch((e: any) => console.error(`Unable to connect to the database${e}.`.red))

const models = {
    MoviesFacts: defineMoviesFacts(seq),
    SubtitlesFacts: defineSubtitlesFacts(seq),
    Actors: defineActors(seq),
    Scenarists: defineScenarists(seq),
    Directors: defineDirectors(seq),
    Genres: defineGenres(seq),
    Languages: defineSubtitles(seq),
    Times: defineTimes(seq),
    Movies: defineMovies(seq)

}

forEach(models, (value) => {
    if (typeof value.associate === 'function') {
        value.associate(models)
    }
})


type Models = typeof models

export type { Models }
export { seq, models }
