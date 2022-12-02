import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'
import {LANGUAGE} from "../../utils/enums";

export class SubtitlesModel extends DatabaseModel {
    id: number
    language: LANGUAGE
}

export default (sequelize: Sequelize) => {
    SubtitlesModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            language: {
                type: DataTypes.STRING(2),
                allowNull: true
            }
        },

        {
            sequelize,
            timestamps: false,
            modelName: 'actors',
            paranoid: false
        }
    )
    ;SubtitlesModel.associate = (models: Models) => {
        SubtitlesModel.hasMany(models.SubtitlesFacts, {
            foreignKey: {
                name: 'subtitleID',
                allowNull: true
            }
        })
    }
    return SubtitlesModel
}
