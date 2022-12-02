import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'
import {ScenaristModel} from "./scenarists";

export class GenresModel extends DatabaseModel {
    id: number
    name: string

}

export default (sequelize: Sequelize) => {
    GenresModel.init(
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
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'genres',
            paranoid: false
        }
    )
    ;GenresModel.associate = (models: Models) => {
        GenresModel.hasMany(models.SubtitlesFacts, {
            foreignKey: {
                name: 'genreID',
                allowNull: true
            }
        })
        GenresModel.hasMany(models.MoviesFacts, {
            foreignKey: {
                name: 'genreID',
                allowNull: true
            }
        })
    }
    return GenresModel
}
