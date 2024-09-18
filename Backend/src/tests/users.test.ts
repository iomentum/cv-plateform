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
      file: undefined,
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    prismaClient = new (PrismaClient as any)();
    (PrismaClient as jest.Mock).mockClear();
  });

  describe('register', () => {
    it('should create a new user successfully without profile picture', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      prismaClient.user.create.mockResolvedValue(mockUser);
      mockRequest.body = { email: 'test@example.com', password: 'password123', name: 'Test User', surname: 'Surname', city: 'City', phoneNumber: '1234567890', domain: 'IT' };
      await userController.register(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        userId: mockUser.id,
        message: 'User created successfully',
      });
    });

  it('should create a new user successfully with profile picture', async () => {
    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', profilePicture: 'uploads/profile-pictures/test.jpg' };
    prismaClient.user.create.mockResolvedValue(mockUser);
    mockRequest.body = { email: 'test@example.com', password: 'password123', name: 'Test User', surname: 'Surname', city: 'City', phoneNumber: '1234567890', domain: 'IT' };
    mockRequest.file = { path: 'uploads/profile-pictures/test.jpg' } as Express.Multer.File;
    await userController.register(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      userId: mockUser.id,
      message: 'User created successfully',
    });
    expect(prismaClient.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          profilePicture: 'uploads/profile-pictures/test.jpg'
        })
      })
    );
  });

    it('should return an error if email already exists', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed on the fields: (`email`)',
        { clientVersion: '2.0.0', code: 'P2002' }
      );
      prismaClient.user.create.mockRejectedValue(prismaError);

      mockRequest.body = { 
        email: 'existing@example.com', 
        password: 'password123',
        name: 'Test User',
        surname: 'Test Surname',
        city: 'Test City',
        phoneNumber: '1234567890',
        domain: 'IT'
      };

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

  describe('updateUser', () => {
    it('should update user successfully without changing profile picture', async () => {
      const mockUser = { 
        id: 1, 
        email: 'test@example.com', 
        name: 'Updated User',
        surname: 'Updated',
        city: 'Updated City',
        phoneNumber: '9876543210',
        domain: 'Design'
      };
      prismaClient.user.update.mockResolvedValue(mockUser);
      mockRequest.params = { id: '1' };
      mockRequest.body = { 
        email: 'test@example.com', 
        name: 'Updated User',
        surname: 'Updated',
        city: 'Updated City',
        phoneNumber: '9876543210',
        domain: 'Design'
      };
      await userController.updateUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalledWith({
        user: mockUser,
        message: 'User updated successfully',
      });
    });

    it('should update user successfully with new profile picture', async () => {
      const mockUser = { 
        id: 1, 
        email: 'test@example.com', 
        name: 'Updated User',
        surname: 'Updated',
        city: 'Updated City',
        phoneNumber: '9876543210',
        domain: 'Design',
        profilePicture: 'uploads/profile-pictures/new-test.jpg'
      };
      prismaClient.user.update.mockResolvedValue(mockUser);
      mockRequest.params = { id: '1' };
      mockRequest.body = { 
        email: 'test@example.com', 
        name: 'Updated User',
        surname: 'Updated',
        city: 'Updated City',
        phoneNumber: '9876543210',
        domain: 'Design'
      };
      mockRequest.file = { path: 'uploads/profile-pictures/new-test.jpg' } as Express.Multer.File;
      await userController.updateUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalledWith({
        user: mockUser,
        message: 'User updated successfully',
      });
      expect(prismaClient.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            profilePicture: 'uploads/profile-pictures/new-test.jpg'
          })
        })
      );
    });
  });

  // Add more test cases for other controller methods (getAllUsers, getUser, deleteUser)
});