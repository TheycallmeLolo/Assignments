import { Router } from "express";
import * as signupService from './services/users.services.js';
const userController = Router();

userController.post('/signup',signupService.signupService)
userController.put('/:id',signupService.updateService)
userController.get('/by-email',signupService.findByEmailService)
userController.get('/:id',signupService.findByIdService)

export default userController;