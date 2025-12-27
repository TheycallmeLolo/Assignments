import * as postServices from './services/posts.services.js';
import { Router } from 'express'
const postController = Router();

postController.post('/posts', postServices.createpostService)
postController.delete('/:postId', postServices.deletepostService)
postController.get('/details', postServices.getPostsDetailsService)
postController.get('/comment-count', postServices.getPostsWithCountOfCommentsService)

export default postController;