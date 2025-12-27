import { DataTypes, Model } from "sequelize";
import {sequelize_config} from "../dbconnection.js";
import User from './users.model.js';
import Comment from "./comments.model.js";

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    content: {
      type: DataTypes.TEXT
    },

    post_userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: sequelize_config,
    modelName: 'post',
    paranoid: true,     
    timestamps: true
  }
);

export default Post;

// // Post → Comments
// Post.hasMany(Comment, {
// foreignKey: "post_comment_id",
// onDelete: "CASCADE"
// });


// Comment.belongsTo(Post, {
// foreignKey: "post_comment_id"
// });



