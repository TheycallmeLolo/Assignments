import Comment from '../../DataBase/Models/comments.model.js';
import User from '../../DataBase/Models/users.model.js';
import { Op } from 'sequelize';
import Post from '../../DataBase/Models/posts.model.js';

export const createCommentsService = async (req, res) => {
    try {
        const { comments } = req.body;

        if (!Array.isArray(comments) || comments.length === 0) {
            return res.status(400).json({ message: 'Please provide an array of comments' });
        }

        // Validate each comment
        const invalidComments = comments.filter(c => !c.content || !c.post_id || !c.user_id);
        if (invalidComments.length > 0) {
            return res.status(400).json({
                message: 'All comments must have content, post_id, and user_id',
                invalidComments
            });
        }

        const newComments = await Comment.bulkCreate(comments);

        res.status(201).json({
            message: 'Comments Created Successfully',
            data: newComments
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error createCommentsService',
            error: error.message
        });
    }
};

export const updateCommentsService = async (req, res) => {
    try {
        const { content, user_id } = req.body
        const { commentId } = req.params
        const isCommentExist = await Comment.findByPk(commentId)
        if (!isCommentExist) return res.status(404).json({ message: 'Comment Not Found' })
        const isOwner = await User.findByPk(user_id)
        if (!isOwner) return res.status(404).json({ message: "You are not authorized to update this comment." })
        await Comment.update({ content }, { where: { id: commentId } })
        const newComment = await Comment.findByPk(commentId)
        res.status(201).json({ message: 'Comments Updated Successfully', data: newComment })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error createCommentsService', error: error.message, stack: error.stack })
    }
}


// export const findOrCreateCommentsService = async (req, res) => {
//     try {
//         const { content, post_id, user_id } = req.body;

//         if (!content || !post_id || !user_id) {
//             return res.status(400).json({
//                 message: 'content, post_id, and user_id are required'
//             });
//         }

//         const [comment, created] = await Comment.findOrCreate({
//             where: { content, post_id, user_id }, // Check if comment exists
//             defaults: { content, post_id, user_id } // Values to use if creating
//         });

//         res.status(200).json({
//             message: created ? 'Comment created successfully' : 'Comment already exists',
//             data: comment
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Internal Server Error findOrCreateCommentService',
//             error: error.message
//         });
//     }
// };

export const findOrCreateCommentsService = async (req, res) => {
    try {
        const { content, post_id, user_id } = req.body

        if (!content || !post_id || !user_id) {
            return res.status(400).json({
                message: 'content, post_id, and user_id are required'
            });
        }

        const isCommentExist = await Comment.findOne({
            where: {
                [Op.and]: [
                    { content: content },
                    { post_id: post_id },
                    { user_id: user_id }
                ]
            }
        })
        if (!isCommentExist) {
            const newComment = await Comment.create({ content, post_id, user_id })
            return res.status(201).json({
                message: 'Comments Created Successfully',
                data: newComment
            });
        }
        return res.status(200).json({ message: 'Comment Already Exist', data: isCommentExist })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error createCommentsService', error: error.message, stack: error.stack })
    }
}


export const searchCommentsService = async (req, res) => {
    try {
        const { word } = req.query; // Get the 'word' query parameter
        if (!word) {
            return res.status(400).json({ message: 'Please provide a word to search' });
        }

        const result = await Comment.findAndCountAll({
            where: {
                content: { [Op.like]: `%${word}%` },
            },
        });

        if (result.count === 0) {
            return res.status(404).json({ message: 'No comments found' });
        }

        return res.status(200).json({
            message: `Comments containing "${word}":`,
            data: result.rows,
            count: result.count
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error searchCommentsService',
            error: error.message,
            stack: error.stack,
        });
    }
};

// dont relie on this

// export const searchCommentsService = async (req, res) => {
//   try {
//     const {word} = req.query;
//     const isCommentExist = await Comment.findAll({
//       where: {
//         content: { [Op.like]: `%${word}%` },
//       },
//     });

//     if (!isCommentExist)
//       return res.status(404).json({
//         message: 'No comments found',
//       });

//     return res.status(200).json({
//       message: `Comments containing ${word}:`,
//       data: isCommentExist,
//       count:isCommentExist.length
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: 'Internal Server Error searchCommentsService',
//       error: error.message,
//       stack: error.stack,
//     });
//   }
// };

export const threeRecentCommentsService = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.findAll({
            where: {
                post_id: postId
            },
            limit: 3,
            order: [['createdAt', 'DESC']],
        });

        if (comments.length === 0) {
            return res.status(404).json({
                message: 'No comments found for this post',
            });
        }

        return res.status(200).json({
            message: `Three Recent Comments for post ${postId}:`,
            data: comments,
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error threeRecentCommentsService',
            error: error.message,
            stack: error.stack,
        });
    }
};

export const specificCommentsService = async (req, res) => {
    try {
        const { id } = req.params;
        const icCommentExist = await Comment.findByPk(id);
        if (!icCommentExist)
            return res.status(404).json({
                message: 'No Comment Exist',
            });
        const user = await Comment.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password','createdAt','updatedAt'] }
                },
                {
                    model: Post,
                    attributes: { exclude: ['createdAt','updatedAt'] }
                }
            ],
            attributes: { exclude: ['createdAt','updatedAt'] }
        })
        return res.status(200).json({
            message: 'All Data',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error specificCommentsService',
            error: error.message,
            stack: error.stack,
        });
    }
};
