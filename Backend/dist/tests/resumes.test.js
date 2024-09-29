"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const promises_1 = __importDefault(require("fs/promises"));
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
                constructor(message, { code }) {
                    super(message);
                    this.code = code;
                }
            },
        },
    };
});
jest.mock('fs/promises');
const resumes_1 = require("../controllers/resumes");
describe('Resume Controller', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {
            params: {},
            file: {
                filename: 'test.pdf',
                path: '/tmp/test.pdf',
                mimetype: 'application/pdf',
            },
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
            promises_1.default.readFile.mockResolvedValue(Buffer.from('fake pdf content'));
            promises_1.default.unlink.mockResolvedValue(undefined);
            mockRequest.params = { userId: '1' };
            await resumes_1.resumeController.uploadResume(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Resume uploaded successfully',
                resumeId: mockResume.id,
            });
        });
        it('should return 400 if no user ID is provided', async () => {
            mockRequest.params = {};
            await resumes_1.resumeController.uploadResume(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'User ID is required' });
        });
        it('should return 400 if no file is uploaded', async () => {
            mockRequest.file = undefined;
            mockRequest.params = { userId: '1' };
            await resumes_1.resumeController.uploadResume(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'No file uploaded' });
        });
        it('should return 400 if file is not a PDF', async () => {
            mockRequest.file = { ...mockRequest.file, mimetype: 'image/jpeg' };
            mockRequest.params = { userId: '1' };
            await resumes_1.resumeController.uploadResume(mockRequest, mockResponse);
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
            await resumes_1.resumeController.downloadResume(mockRequest, mockResponse);
            expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
            expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Disposition', 'attachment; filename="test.pdf"');
            expect(mockResponse.send).toHaveBeenCalledWith(mockResume.data);
        });
        it('should return 400 if no resume ID is provided', async () => {
            mockRequest.params = {};
            await resumes_1.resumeController.downloadResume(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Resume ID is required' });
        });
        it('should return 404 if resume is not found', async () => {
            mockResumeFindUnique.mockResolvedValue(null);
            mockRequest.params = { id: '999' };
            await resumes_1.resumeController.downloadResume(mockRequest, mockResponse);
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
            await resumes_1.resumeController.getUserResumes(mockRequest, mockResponse);
            expect(mockUserFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(mockResumeFindMany).toHaveBeenCalledWith({
                where: { userId: 1 },
                select: { id: true, filename: true, createdAt: true, updatedAt: true },
            });
            expect(mockResponse.json).toHaveBeenCalledWith(mockResumes);
        });
        it('should return 400 if no user ID is provided', async () => {
            mockRequest.params = {};
            await resumes_1.resumeController.getUserResumes(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'User ID is required' });
        });
        it('should return 404 if user is not found', async () => {
            mockUserFindUnique.mockResolvedValue(null);
            mockRequest.params = { id: '999' };
            await resumes_1.resumeController.getUserResumes(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'User not found' });
        });
    });
    describe('deleteResume', () => {
        it('should delete a resume successfully', async () => {
            const mockResume = { id: 1, filename: 'test.pdf' };
            mockResumeDelete.mockResolvedValue(mockResume);
            mockRequest.params = { id: '1' };
            await resumes_1.resumeController.deleteResume(mockRequest, mockResponse);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Resume deleted successfully',
                resumeId: mockResume.id,
            });
        });
        it('should return 400 if no resume ID is provided', async () => {
            mockRequest.params = {};
            await resumes_1.resumeController.deleteResume(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Resume ID is required' });
        });
        it('should return 404 if resume is not found', async () => {
            mockResumeDelete.mockRejectedValue(new client_1.Prisma.PrismaClientKnownRequestError('Not found', { code: 'P2025', clientVersion: '' }));
            mockRequest.params = { id: '999' };
            await resumes_1.resumeController.deleteResume(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Resume not found' });
        });
    });
});
