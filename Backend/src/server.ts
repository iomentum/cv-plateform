import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import jwt from "jsonwebtoken";
import multer from "multer";
import { userController } from "./controllers/users";
import { resumeController } from "./controllers/resumes";
const app: Express = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());

interface AuthRequest extends Request {
  user?: any;
}

const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const upload = multer({ dest: "uploads/" });

app.post("/register", upload.single("profilePicture"), userController.register);
app.post("/login", userController.login);
app.get("/users", authenticateToken, userController.getAllUsers);
app.get("/users/:id", authenticateToken, userController.getUser);
app.put(
  "/users/:id",
  authenticateToken,
  upload.single("profilePicture"),
  userController.updateUser
);
app.delete("/users/:id", authenticateToken, userController.deleteUser);
app.get(
  "/users/:id/resumes",
  authenticateToken,
  resumeController.getUserResumes
);
app.post(
  "/users/:userId/resumes",
  authenticateToken,
  upload.single("resume"),
  resumeController.uploadResume
);
app.get("/resumes/:id", resumeController.downloadResume);
app.delete("/resumes/:id", authenticateToken, resumeController.deleteResume);

app.post("/generate-resume/:templateId", resumeController.generateResumeResume);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
