import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'

export class MoviesModel extends DatabaseModel {
    id: number
    name: string
    country: string

}

export default (sequelize: Sequelize) => {
    MoviesModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            country: {
                type: DataTypes.TEXT,
                allowNull: true,
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'movies',
            paranoid: false
        }
    )
    ;MoviesModel.associate = (models: Models) => {
        MoviesModel.hasMany(models.SubtitlesFacts, {
            foreignKey: {
                name: 'movieID',
                allowNull: true
            }
        })
        MoviesModel.hasMany(models.MoviesFacts, {
            foreignKey: {
                name: 'movieID',
                allowNull: true
            }
        })
    }
    return MoviesModel
}
