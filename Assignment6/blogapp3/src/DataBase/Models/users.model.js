import { sequelize_config } from "../dbconnection.js";
import { DataTypes } from "sequelize";
import Post from "./posts.model.js";
import Comment from "./comments.model.js";

const User = sequelize_config.define(
    'User', // Model Name in database as Users
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkPasswordLength(value) {
                    if (value.length <= 6) {
                        throw new Error("Password must be longer than 6 characters");
                    }
                }
            }
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: "user"
        },
    },
    {
        timestamps: true,
        hooks: {
            beforeCreate(user) {
                if (user.name.length <= 2) {
                    throw new Error("Name must be longer than 2 characters");
                }
            }
        }
    }
);
export default User;


// // User → Posts
// User.hasMany(Post, {
//     foreignKey: "user_post_id",
//     onDelete: "CASCADE",
// });


// Post.belongsTo(User, {
//     foreignKey: "user_post_id",
// });


// // User → Comments
// User.hasMany(Comment, {
//     foreignKey: "user_comment_id",
//     onDelete: "CASCADE"
// });


// Comment.belongsTo(User, {
//     foreignKey: "user_comment_id"
// });