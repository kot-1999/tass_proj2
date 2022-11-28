import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'

export class MovieGenersModel extends DatabaseModel {
    genreID: number
    movieID: number
}

export default (sequelize: Sequelize) => {
    MovieGenersModel.init(
        {
            genreID: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            movieID: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'movieGenres',
            paranoid: false
        }
    )
    ;MovieGenersModel.associate = (models: Models) => {

    }
    return MovieGenersModel
}
