import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'
import {LANGUAGE} from "../../utils/enums";

export class LanguagesModel extends DatabaseModel {
    id: number
    code: string
}

export default (sequelize: Sequelize) => {
    LanguagesModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            code: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },

        {
            sequelize,
            timestamps: false,
            modelName: 'languages',
            paranoid: false
        }
    )
    ;LanguagesModel.associate = (models: Models) => {
        LanguagesModel.hasMany(models.SubtitlesFacts, {
            foreignKey: {
                name: 'languageID',
                allowNull: true
            }
        })
    }
    return LanguagesModel
}
