import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'
import {LANGUAGE} from "../../utils/enums";

export class SubtitlesModel extends DatabaseModel {
    id: number
    movieID: number

    language: LANGUAGE
    text: string
    startTime: number
    endTime: number
}

export default (sequelize: Sequelize) => {
    SubtitlesModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: false,
                primaryKey: true,
            },
            movieID: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: false,
            },
            language: {
                type: DataTypes.STRING(2),
                allowNull: false
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            startTime: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            endTime: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'subtitles',
            paranoid: false
        }
    )
    ;SubtitlesModel.associate = (models: Models) => {
        SubtitlesModel.belongsTo(models.Movies, {
            foreignKey: {
                name: 'movieID',
                allowNull: false
            }
        })
    }
    return SubtitlesModel
}
