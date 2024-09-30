"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const users_1 = require("./controllers/users");
const resumes_1 = require("./controllers/resumes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use(express_1.default.json());
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
};
const upload = (0, multer_1.default)({ dest: "uploads/" });
app.post("/register", users_1.userController.register);
app.post("/login", users_1.userController.login);
app.get("/users", authenticateToken, users_1.userController.getAllUsers);
app.get("/users/:id", authenticateToken, users_1.userController.getUser);
app.put("/users/:id", authenticateToken, users_1.userController.updateUser);
app.delete("/users/:id", authenticateToken, users_1.userController.deleteUser);
app.get("/users/:id/resumes", authenticateToken, resumes_1.resumeController.getUserResumes);
app.post("/users/:userId/resumes", authenticateToken, upload.single("resume"), resumes_1.resumeController.uploadResume);
app.get("/resumes/:id", resumes_1.resumeController.downloadResume);
app.delete("/resumes/:id", authenticateToken, resumes_1.resumeController.deleteResume);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
