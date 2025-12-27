import * as commentsServices from './services/comments.services.js';
import { Router } from 'express';
const commentsController = Router();

commentsController.post('/create', commentsServices.createCommentsService)
commentsController.patch('/:commentId', commentsServices.updateCommentsService)
commentsController.post('/find-or-create', commentsServices.findOrCreateCommentsService)
commentsController.get('/search', commentsServices.searchCommentsService)
commentsController.get('/newest/:postId', commentsServices.threeRecentCommentsService)
commentsController.get('/details/:id', commentsServices.specificCommentsService)



export default commentsController