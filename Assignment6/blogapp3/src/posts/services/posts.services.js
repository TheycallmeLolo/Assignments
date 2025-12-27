import Post from '../../DataBase/Models/posts.model.js';
import User from '../../DataBase/Models/users.model.js';
import Comment from '../../DataBase/Models/comments.model.js';
import { Sequelize } from 'sequelize';


export const createpostService = async (req, res) => {
    try {
        const { title, content, post_userId } = req.body;
        const isUserExist = await User.findByPk(post_userId);
        if (!isUserExist) return res.status(404).json({ message: 'User Not Exist' })
        const post = Post.build({
            title,
            content,
            post_userId
        });
        await post.save();
        res.status(201).json({ message: 'Post created Successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Erorr createpostService', error: error.message })
    }
}


export const deletepostService = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ message: 'Post Not Found' });
        const isOwner = post.post_userId == userId;
        if (!isOwner)
            return res
                .status(403)
                .json({ message: 'You are not authorized to delete this post. ' });
        await post.destroy();
        res.status(200).json({ message: 'Post Deleted Successfully' });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Internal Server Error deletepostService', error: error.message });
    }
};


export const getPostsDetailsService = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content']
                }
            ]
        });

        return res.status(200).json({
            message: 'Posts fetched successfully',
            data: posts
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error detailspostService',
            error: error.message
        });
    }
};


export const getPostsWithCountOfCommentsService = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: [
                'id',
                'title',
                [Sequelize.fn('COUNT', Sequelize.col('Comments.id')), 'comment_count'] // Count comments
            ],
            include: [
                {
                    model: Comment,
                    attributes: [] // No need to fetch comment details
                }
            ],
            group: ['Post.id'] // Group by Post ID to make COUNT work
        });

        return res.status(200).json({
            message: 'Posts fetched successfully',
            data: posts
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error getPostsWithCountOfCommentsService',
            error: error.message
        });
    }
};