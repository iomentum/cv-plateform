import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          password: hashedPassword,
          name: req.body.name,
        },
      });
      res.json({ userId: user.id });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  },

  login: async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (user == null) {
      return res.status(400).json({ error: 'Cannot find user' });
    }
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);
        res.json({ accessToken: accessToken });
      } else {
        res.status(401).json({ error: 'Wrong password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Login error' });
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true },
    });
    res.json(users);
  },

  getUser: async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      select: { id: true, email: true, name: true },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.update({
        where: { id: parseInt(req.params.id) },
        data: {
          email: req.body.email,
          name: req.body.name,
        },
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      await prisma.user.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  },
};