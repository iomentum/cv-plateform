const express = require('express');
const jwt = require('jsonwebtoken');
const usersController = require('./controllers/users');

const app = express();

app.use(express.json());

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/register', usersController.register);
app.post('/login', usersController.login);
app.get('/users', authenticateToken, usersController.getAllUsers);
app.get('/users/:id', authenticateToken, usersController.getUser);
app.put('/users/:id', authenticateToken, usersController.updateUser);
app.delete('/users/:id', authenticateToken, usersController.deleteUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));