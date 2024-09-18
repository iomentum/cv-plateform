import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs/promises';

const prisma = new PrismaClient();

export const resumeController = {
  uploadResume: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const file = req.file as Express.Multer.File | undefined;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { filename, path, mimetype } = file;

      if (mimetype !== 'application/pdf') {
        await fs.unlink(path); // Delete the non-PDF file
        return res.status(400).json({ error: 'Only PDF files are allowed' });
      }

      const fileData = await fs.readFile(path);

      const resume = await prisma.resume.create({
        data: {
          filename,
          data: fileData,
          mimeType: mimetype,
          userId: parseInt(userId),
        },
      });

      await fs.unlink(path); // Delete the temporary file

      res.status(201).json({ message: 'Resume uploaded successfully', resumeId: resume.id });
    } catch (error) {
      console.error('Error uploading resume:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          return res.status(404).json({ error: 'User not found' });
        }
      }
      res.status(500).json({ error: 'An error occurred while uploading the resume' });
    }
  },

  downloadResume: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Resume ID is required' });
      }

      const resume = await prisma.resume.findUnique({
        where: { id: parseInt(id) },
      });

      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.setHeader('Content-Type', resume.mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${resume.filename}"`);
      res.send(resume.data);
    } catch (error) {
      console.error('Error downloading resume:', error);
      if (error instanceof Error && error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid resume ID format' });
      }
      res.status(500).json({ error: 'An error occurred while downloading the resume' });
    }
  },

  getUserResumes: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const resumes = await prisma.resume.findMany({
        where: { userId: parseInt(id) },
        select: { id: true, filename: true, createdAt: true, updatedAt: true },
      });

      res.json(resumes);
    } catch (error) {
      console.error('Error fetching user resumes:', error);
      res.status(500).json({ error: 'An error occurred while fetching user resumes' });
    }
  },

  deleteResume: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Resume ID is required' });
      }

      const deletedResume = await prisma.resume.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: 'Resume deleted successfully', resumeId: deletedResume.id });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return res.status(404).json({ error: 'Resume not found' });
      }
      console.error('Error deleting resume:', error);
      res.status(500).json({ error: 'An error occurred while deleting the resume' });
    }
  },
};