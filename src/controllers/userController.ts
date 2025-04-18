import * as express from 'express';
import { User } from '../models/User';

// Simulated database
let users: User[] = [];
let nextId = 1;

export const userController = {
  // Get all users
  getAllUsers: (req: express.Request, res: express.Response) => {
    res.json(users);
  },

  // Get user by id
  getUserById: (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  },

  // Create new user
  createUser: (req: express.Request, res: express.Response) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser: User = {
      id: nextId++,
      username,
      email,
      password, // Note: In a real application, you should hash the password
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);
    res.status(201).json(newUser);
  },

  // Update user
  updateUser: (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const { username, email } = req.body;
    
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users[userIndex] = {
      ...users[userIndex],
      username: username || users[userIndex].username,
      email: email || users[userIndex].email,
      updatedAt: new Date()
    };

    res.json(users[userIndex]);
  },

  // Delete user
  deleteUser: (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users = users.filter(u => u.id !== id);
    res.status(204).send();
  }
}; 