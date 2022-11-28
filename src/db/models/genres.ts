import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'

export class GenersModel extends DatabaseModel {
    id: number
    name: string
}

export default (sequelize: Sequelize) => {
    GenersModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'genres',
            paranoid: false
        }
    )
    ;GenersModel.associate = (models: Models) => {
        GenersModel.belongsToMany(models.Movies, {
            foreignKey: {
                name: 'genreID',
                allowNull: false
            },
            through: {
                model: models.MovieGeners,
                unique: false
            },
            constraints: false
        })
    }
    return GenersModel
}
