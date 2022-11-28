import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'
import {ROLE} from "../../utils/enums";
import {SubtitlesModel} from "./subtitles";

export class TeamMatesModel extends DatabaseModel {
    movieID: number
    personID: number
}

export default (sequelize: Sequelize) => {
    TeamMatesModel.init(
        {
            movieID: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: false,
            },
            personID: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: false,
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'moviesPersons',
            paranoid: false
        }
    )
    ;TeamMatesModel.associate = (models: Models) => {
        TeamMatesModel.belongsTo(models.Movies, {
            foreignKey: {
                name: 'movieID',
                allowNull: false
            },
            constraints: false
        })
        TeamMatesModel.belongsTo(models.Persons, {
            foreignKey: {
                name: 'personID',
                allowNull: false
            },
            constraints: false
        })
    }
    return TeamMatesModel
}
