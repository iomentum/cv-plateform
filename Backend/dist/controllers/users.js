"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
exports.userController = {
    register: async (req, res) => {
        try {
            const { email, password, name, surname, city, phoneNumber, domain } = req.body;
            const profilePicture = req.file ? req.file.path : null;
            if (!email || !password || !name || !surname || !city || !phoneNumber || !domain) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    surname,
                    city,
                    phoneNumber,
                    profilePicture,
                    domain
                },
            });
            res.status(201).json({ userId: user.id, message: 'User created successfully' });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(409).json({ error: 'A user with this email already exists' });
                }
            }
            console.error('Registration error:', error);
            res.status(500).json({ error: 'An unexpected error occurred during registration' });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const validPassword = await bcrypt_1.default.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ accessToken, userId: user.id, message: 'Login successful' });
        }
        catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'An unexpected error occurred during login' });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await prisma.user.findMany({
                select: { id: true, email: true, name: true },
            });
            res.json(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'An error occurred while fetching users' });
        }
    },
    getUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) },
                select: { id: true, email: true, name: true },
            });
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ error: 'User not found' });
            }
        }
        catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'An error occurred while fetching the user' });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { email, name, surname, city, phoneNumber, description, domain } = req.body;
            const profilePicture = req.file ? req.file.path : undefined;
            const updateData = {
                email,
                name,
                surname,
                city,
                phoneNumber,
                description,
                domain
            };
            if (profilePicture) {
                updateData.profilePicture = profilePicture;
            }
            const user = await prisma.user.update({
                where: { id: parseInt(id) },
                data: updateData,
            });
            res.json({ user, message: 'User updated successfully' });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return res.status(404).json({ error: 'User not found' });
                }
            }
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'An error occurred while updating the user' });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            await prisma.user.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return res.status(404).json({ error: 'User not found' });
                }
            }
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        }
    },
};
