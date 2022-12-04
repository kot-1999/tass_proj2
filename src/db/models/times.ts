import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'

export class TimeModel extends DatabaseModel {
    id: number

    year: number
    month: number
    date: number

}

export default (sequelize: Sequelize) => {
    TimeModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            month: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            date: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'times',
            paranoid: false
        }
    )
    ;TimeModel.associate = (models: Models) => {
        TimeModel.hasMany(models.SubtitlesFacts, {
            foreignKey: {
                name: 'timeID',
                allowNull: true
            }
        })
        TimeModel.hasMany(models.MoviesFacts, {
            foreignKey: {
                name: 'timeID',
                allowNull: true
            }
        })
    }
    return TimeModel
}
