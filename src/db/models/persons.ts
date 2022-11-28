import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'
import {ROLE} from "../../utils/enums";

export class PersonModel extends DatabaseModel {
    id: number
    primaryName: string
    role: ROLE
}

export default (sequelize: Sequelize) => {
    PersonModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            primaryName: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'persons',
            paranoid: false
        }
    )
    ;PersonModel.associate = (models: Models) => {
        PersonModel.belongsToMany(models.Movies, {
            foreignKey: {
                name: 'personID',
                allowNull: false
            },
            through: {
                model: models.MoviesPersons,
                unique: false
            }
        })
    }
    return PersonModel
}
