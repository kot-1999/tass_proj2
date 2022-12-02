import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'
import {GENDER} from "../../utils/enums";
import {ScenaristModel} from "./scenarists";

export class DicrectorModel extends DatabaseModel {
    id: number

    fullName: string
    gender: GENDER
    yearOFBirth: string

}

export default (sequelize: Sequelize) => {
    DicrectorModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            fullName: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            gender: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            yearOFBirth: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'directors',
            paranoid: false
        }
    )
    ;DicrectorModel.associate = (models: Models) => {
        DicrectorModel.hasMany(models.SubtitlesFacts, {
            foreignKey: {
                name: 'directorID',
                allowNull: true
            }
        })
        DicrectorModel.hasMany(models.MoviesFacts, {
            foreignKey: {
                name: 'directorID',
                allowNull: true
            }
        })
    }
    return DicrectorModel
}
