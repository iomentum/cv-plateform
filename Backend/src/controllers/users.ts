import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, name, surname, city, phoneNumber, domain } = req.body;

      if (!email || !password || !name || !surname || !city || !phoneNumber || !domain) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          surname,
          city,
          phoneNumber,
          domain
        },
      });
      res.status(201).json({ userId: user.id, message: 'User created successfully' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(409).json({ error: 'A user with this email already exists' });
        }
      }
      console.error('Registration error:', error);
      res.status(500).json({ error: 'An unexpected error occurred during registration' });
    }
  },
  
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      res.json({ accessToken, userId: user.id, message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'An unexpected error occurred during login' });
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: { id: true, email: true, name: true },
      });
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: { id: true, email: true, name: true, surname: true, city: true, phoneNumber: true, domain: true , description: true},
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { email, name, surname, city, phoneNumber, description, domain } = req.body;

      const updateData: any = { 
        email, 
        name, 
        surname, 
        city, 
        phoneNumber, 
        description, 
        domain 
      };

      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: updateData,
      });
      res.json({ user, message: 'User updated successfully' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return res.status(404).json({ error: 'User not found' });
        }
      }
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return res.status(404).json({ error: 'User not found' });
        }
      }
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  },
};