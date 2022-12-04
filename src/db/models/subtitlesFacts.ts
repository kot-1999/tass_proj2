import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'

export class SubtitlesFactsModel extends DatabaseModel {
    id: number

    timeID: number
    movieID: number
    genreID: number
    scenaristID: number
    directorID: number

    wordsCount: number
    numberOfReplicas: number
    numberOfCharacters: number
}

export default (sequelize: Sequelize) => {
    SubtitlesFactsModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            wordsCount: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
            numberOfReplicas: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
            numberOfCharacters: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'subtitlesFacts',
            paranoid: false
        }
    )
    ;SubtitlesFactsModel.associate = (models: Models) => {
        SubtitlesFactsModel.belongsTo(models.Times, {
            foreignKey: {
                name: 'timeID',
                allowNull: true
            }
        })
        SubtitlesFactsModel.belongsTo(models.Subtitles, {
            foreignKey: {
                name: 'subtitleID',
                allowNull: true
            }
        })
        SubtitlesFactsModel.belongsTo(models.Movies, {
            foreignKey: {
                name: 'movieID',
                allowNull: true
            }
        })
        SubtitlesFactsModel.belongsTo(models.Genres, {
            foreignKey: {
                name: 'genreID',
                allowNull: true
            }
        })
        SubtitlesFactsModel.belongsTo(models.Scenarists, {
            foreignKey: {
                name: 'scenaristID',
                allowNull: true
            }
        })
        SubtitlesFactsModel.belongsTo(models.Directors, {
            foreignKey: {
                name: 'directorID',
                allowNull: true
            }
        })
    }
    return SubtitlesFactsModel
}
