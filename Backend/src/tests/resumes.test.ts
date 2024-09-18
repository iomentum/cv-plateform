import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs/promises';

// Mocks pour Prisma
const mockUserFindUnique = jest.fn();
const mockResumeCreate = jest.fn();
const mockResumeFindUnique = jest.fn();
const mockResumeFindMany = jest.fn();
const mockResumeDelete = jest.fn();

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        user: {
          findUnique: mockUserFindUnique,
        },
        resume: {
          create: mockResumeCreate,
          findUnique: mockResumeFindUnique,
          findMany: mockResumeFindMany,
          delete: mockResumeDelete,
        },
      })),
      Prisma: {
        PrismaClientKnownRequestError: class extends Error {
          code: string;
          constructor(message: string, { code }: { code: string }) {
            super(message);
            this.code = code;
          }
        },
      },
    };
});

jest.mock('fs/promises');

import { resumeController } from '../controllers/resumes';

describe('Resume Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      params: {},
      file: {
        filename: 'test.pdf',
        path: '/tmp/test.pdf',
        mimetype: 'application/pdf',
      } as Express.Multer.File,
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('uploadResume', () => {
    it('should upload a resume successfully', async () => {
      const mockResume = { id: 1, filename: 'test.pdf' };
      mockResumeCreate.mockResolvedValue(mockResume);
      (fs.readFile as jest.Mock).mockResolvedValue(Buffer.from('fake pdf content'));
      (fs.unlink as jest.Mock).mockResolvedValue(undefined);

      mockRequest.params = { userId: '1' };

      await resumeController.uploadResume(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Resume uploaded successfully',
        resumeId: mockResume.id,
      });
    });

    it('should return 400 if no user ID is provided', async () => {
      mockRequest.params = {};
      await resumeController.uploadResume(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'User ID is required' });
    });

    it('should return 400 if no file is uploaded', async () => {
      mockRequest.file = undefined;
      mockRequest.params = { userId: '1' };
      await resumeController.uploadResume(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'No file uploaded' });
    });

    it('should return 400 if file is not a PDF', async () => {
      mockRequest.file = { ...mockRequest.file, mimetype: 'image/jpeg' } as Express.Multer.File;
      mockRequest.params = { userId: '1' };
      await resumeController.uploadResume(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Only PDF files are allowed' });
    });
  });

  describe('downloadResume', () => {
    it('should download a resume successfully', async () => {
      const mockResume = {
        id: 1,
        filename: 'test.pdf',
        mimeType: 'application/pdf',
        data: Buffer.from('fake pdf content'),
      };
      mockResumeFindUnique.mockResolvedValue(mockResume);

      mockRequest.params = { id: '1' };

      await resumeController.downloadResume(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
      expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Disposition', 'attachment; filename="test.pdf"');
      expect(mockResponse.send).toHaveBeenCalledWith(mockResume.data);
    });

    it('should return 400 if no resume ID is provided', async () => {
      mockRequest.params = {};
      await resumeController.downloadResume(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Resume ID is required' });
    });

    it('should return 404 if resume is not found', async () => {
      mockResumeFindUnique.mockResolvedValue(null);
      mockRequest.params = { id: '999' };
      await resumeController.downloadResume(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Resume not found' });
    });
  });

  describe('getUserResumes', () => {
    it('should fetch user resumes successfully', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      const mockResumes = [
        { id: 1, filename: 'resume1.pdf', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, filename: 'resume2.pdf', createdAt: new Date(), updatedAt: new Date() },
      ];

      mockUserFindUnique.mockResolvedValue(mockUser);
      mockResumeFindMany.mockResolvedValue(mockResumes);

      mockRequest.params = { id: '1' };

      await resumeController.getUserResumes(mockRequest as Request, mockResponse as Response);

      expect(mockUserFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockResumeFindMany).toHaveBeenCalledWith({
        where: { userId: 1 },
        select: { id: true, filename: true, createdAt: true, updatedAt: true },
      });
      expect(mockResponse.json).toHaveBeenCalledWith(mockResumes);
    });

    it('should return 400 if no user ID is provided', async () => {
      mockRequest.params = {};
      await resumeController.getUserResumes(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'User ID is required' });
    });

    it('should return 404 if user is not found', async () => {
      mockUserFindUnique.mockResolvedValue(null);
      mockRequest.params = { id: '999' };
      await resumeController.getUserResumes(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('deleteResume', () => {
    it('should delete a resume successfully', async () => {
      const mockResume = { id: 1, filename: 'test.pdf' };
      mockResumeDelete.mockResolvedValue(mockResume);
      mockRequest.params = { id: '1' };
      await resumeController.deleteResume(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Resume deleted successfully',
        resumeId: mockResume.id,
      });
    });

    it('should return 400 if no resume ID is provided', async () => {
      mockRequest.params = {};
      await resumeController.deleteResume(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Resume ID is required' });
    });

    it('should return 404 if resume is not found', async () => {
      mockResumeDelete.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Not found', { code: 'P2025', clientVersion: '' }));
      mockRequest.params = { id: '999' };
      await resumeController.deleteResume(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Resume not found' });
    });
  });
});