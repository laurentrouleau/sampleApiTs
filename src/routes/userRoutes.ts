import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();

// Get all users
router.get('/', userController.getAllUsers);

// Get user by id
router.get('/:id', userController.getUserById);

// Create new user
router.post('/', userController.createUser);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

export default router; 