import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!process.env.TOKEN_KEY) {
      throw new Error("JWT secret key is missing in environment variables");
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const student = await prisma.student.findUnique({ where: { id: decoded.id } });
    const teacher = await prisma.teacher.findUnique({ where: { id: decoded.id } });

    if (!student && !teacher) {
      return res.status(404).json({ message: "User not found" });
    }

    req.token = token;
    if (student) {
        req.user = student;
        req.userType = 'student';
    } else {
        req.user = teacher;
        req.userType = 'teacher';
    }
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};
