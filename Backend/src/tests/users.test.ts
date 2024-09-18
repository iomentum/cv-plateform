import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { userController } from '../controllers/users';

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { 
    PrismaClient: jest.fn(() => mockPrismaClient),
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

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true),
}));

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockToken'),
}));

describe('User Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let prismaClient: any;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    prismaClient = new (PrismaClient as any)();
    (PrismaClient as jest.Mock).mockClear();
  });

  describe('register', () => {
    it('should create a new user successfully', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      prismaClient.user.create.mockResolvedValue(mockUser);

      mockRequest.body = { email: 'test@example.com', password: 'password123', name: 'Test User' };

      await userController.register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        userId: mockUser.id,
        message: 'User created successfully',
      });
    });

    it('should return an error if email already exists', async () => {
      prismaClient.user.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint failed on the fields: (`email`)', {
          code: 'P2002',
          clientVersion: '2.0.0',
        })
      );

      mockRequest.body = { email: 'existing@example.com', password: 'password123' };

      await userController.register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'A user with this email already exists' });
    });
  });

  describe('login', () => {
    it('should login successfully and return a token', async () => {
      const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      prismaClient.user.findUnique.mockResolvedValue(mockUser);

      mockRequest.body = { email: 'test@example.com', password: 'password123' };

      await userController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith({
        accessToken: 'mockToken',
        userId: mockUser.id,
        message: 'Login successful',
      });
    });

    it('should return an error for invalid credentials', async () => {
      prismaClient.user.findUnique.mockResolvedValue(null);

      mockRequest.body = { email: 'nonexistent@example.com', password: 'wrongpassword' };

      await userController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  // Add more test cases for other controller methods (getAllUsers, getUser, updateUser, deleteUser)
});