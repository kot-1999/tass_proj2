import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'

export class MoviesFactsModel extends DatabaseModel {
    id: number

    actorID: number
    timeID: number
    movieID: number
    genreID: number
    scenaristID: number
    directorID: number

    budget: number
    numOfVotes: number
    rating: number
    duration: number
}

export default (sequelize: Sequelize) => {
    MoviesFactsModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            budget: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            numOfVotes: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'moviesFacts',
            paranoid: false
        }
    )
    ;MoviesFactsModel.associate = (models: Models) => {
        MoviesFactsModel.belongsTo(models.Times, {
            foreignKey: {
                name: 'timeID',
                allowNull: true
            }
        })
        MoviesFactsModel.belongsTo(models.Actors, {
            foreignKey: {
                name: 'actorID',
                allowNull: true
            }
        })
        MoviesFactsModel.belongsTo(models.Movies, {
            foreignKey: {
                name: 'movieID',
                allowNull: true
            }
        })
        MoviesFactsModel.belongsTo(models.Genres, {
            foreignKey: {
                name: 'genreID',
                allowNull: true
            }
        })
        MoviesFactsModel.belongsTo(models.Scenarists, {
            foreignKey: {
                name: 'scenaristID',
                allowNull: true
            }
        })
        MoviesFactsModel.belongsTo(models.Directors, {
            foreignKey: {
                name: 'directorID',
                allowNull: true
            }
        })
    }
    return MoviesFactsModel
}
