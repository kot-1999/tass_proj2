import 'dotenv/config'
import { Options } from 'sequelize'

export const development = {

    url: process.env.GLOBAL_URL,
    options: <Options>{
        minifyAliases: true,
        logging: false,
        dialect: 'postgres',
        pool: {
            max: 4
        }
    },
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeMetaSeeders'

}