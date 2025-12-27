import { DataTypes, Model } from 'sequelize';
import { sequelize_config } from '../dbconnection.js';
class Comment extends Model { }

Comment.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelize_config,
    modelName: 'Comment',
    timestamps: true
})
export default Comment;