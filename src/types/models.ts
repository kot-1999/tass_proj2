import { Model } from 'sequelize'

export class DatabaseModel extends Model {
	static associate?: (models: any) => void
}
