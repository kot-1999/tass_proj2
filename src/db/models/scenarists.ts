import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'
import {GENDER} from "../../utils/enums";
import {TimeModel} from "./times";

export class ScenaristModel extends DatabaseModel {
    id: number

    fullName: string
    gender: GENDER
    yearOFBirth: string
}

export default (sequelize: Sequelize) => {
    ScenaristModel.init(
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
            modelName: 'scenarists',
            paranoid: false
        }
    )
    ;ScenaristModel.associate = (models: Models) => {
        ScenaristModel.hasMany(models.SubtitlesFacts, {
            foreignKey: {
                name: 'scenaristID',
                allowNull: true
            }
        })
        ScenaristModel.hasMany(models.MoviesFacts, {
            foreignKey: {
                name: 'scenaristID',
                allowNull: true
            }
        })
    }
    return ScenaristModel
}
