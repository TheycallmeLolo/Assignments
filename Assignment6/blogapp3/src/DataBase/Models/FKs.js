// DataBase/Models/index.js
import User from './users.model.js';
import Post from './posts.model.js';
import Comment from './comments.model.js';

/* User ↔ Post */
User.hasMany(Post, {
  foreignKey: 'post_userId'
});
Post.belongsTo(User, {
  foreignKey: 'post_userId'
});

/* Post ↔ Comment */
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

/* User ↔ Comment (optional) */
User.hasMany(Comment, {
  foreignKey: 'user_id'
});
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});
