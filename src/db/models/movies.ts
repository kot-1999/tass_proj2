import { Sequelize, DataTypes } from 'sequelize'
import { DatabaseModel } from '../../types/models'
import { Models } from './index'

export class MoviesModel extends DatabaseModel {
    id: number
    name: string
    description: string
    votes: number
    rating: number
    budget: number
    duration: number
    worldWideIncome: number
    reviewsFromUsers: number
    reviewsFromCritics: number

    published: Date
    created: Date
}

export default (sequelize: Sequelize) => {
    MoviesModel.init(
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
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            votes: {
                type: DataTypes.BIGINT,
                allowNull: true,
                defaultValue: 0
            },
            rating: {
                type: DataTypes.REAL,
                allowNull: true,
                defaultValue: 0
            },
            budget: {
                type: DataTypes.DOUBLE,
                allowNull: true,
                defaultValue: null
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null
            },
            worldWideIncome: {
                type: DataTypes.DOUBLE,
                allowNull: true,
                defaultValue: null
            },
            reviewsFromUsers: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            reviewsFromCritics: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            published: {
                type: DataTypes.DATE,
                allowNull: false
            },
            created: {
                type: DataTypes.DATE,
                allowNull: false
            },

        },
        {
            sequelize,
            timestamps: false,
            modelName: 'movies',
            paranoid: false
        }
    )
    ;MoviesModel.associate = (models: Models) => {
        MoviesModel.belongsToMany(models.Genres, {
            foreignKey: {
                name: 'movieID',
                allowNull: false
            },
            through: {
                model: models.MovieGeners,
                unique: false
            },
            constraints: false
        })
        MoviesModel.belongsToMany(models.Persons, {
            foreignKey: {
                name: 'movieID',
                allowNull: false
            },
            through: {
                model: models.MoviesPersons,
                unique: false
            }
        })
        MoviesModel.hasMany(models.Subtitles, {
            foreignKey: {
                name: 'movieID',
                allowNull: false
            }
        })
    }
    return MoviesModel
}
