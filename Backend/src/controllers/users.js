const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.register = async (req, res) => {
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
};

exports.login = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { email: req.body.email } });
  if (user == null) {
    return res.status(400).json({ error: 'Cannot find user' });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ accessToken: accessToken });
    } else {
      res.status(401).json({ error: 'Wrong password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true },
  });
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
    select: { id: true, email: true, name: true },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

exports.updateUser = async (req, res) => {
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
};

exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};