import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'
import {GENDER} from "../../utils/enums";

export class ActorsModel extends DatabaseModel {
    id: number

    fullName: string
    gender: GENDER
    yearOFBirth: string
}

export default (sequelize: Sequelize) => {
    ActorsModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
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
            modelName: 'actors',
            paranoid: false
        }
    )
    ;ActorsModel.associate = (models: Models) => {
        ActorsModel.hasMany(models.MoviesFacts, {
            foreignKey: {
                name: 'actorID',
                allowNull: true
            }
        })
    }
    return ActorsModel
}
