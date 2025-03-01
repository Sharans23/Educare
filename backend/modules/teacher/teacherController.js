import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// Register a new teacher
export const registerTeacher = async (req, res) => {
  try {
    const { sapid, username, email, password, desc } = req.body;

    const existingTeacher = await prisma.teacher.findUnique({ where: { email } });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newTeacher = await prisma.teacher.create({
      data: { sapid, username, email, password: hashedPassword, desc },
    });

    res.status(201).json({ message: "Teacher registered successfully", teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// Login teacher
export const loginTeacher = async (req, res) => {
  try {
    const { sapid, password } = req.body;

    const teacher = await prisma.teacher.findUnique({ where: { sapid } });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: teacher.id }, process.env.TOKEN_KEY);

    res.status(200).json({ message: "Login successful", token, teacherId: teacher.id });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teachers", error: error.message });
  }
};

// Get teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teacher", error: error.message });
  }
};

// Get my profile (Authenticated)
export const getMyProfile = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: req.user.id },
    });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};

// Search teachers by name (partial match) or SAP ID
export const searchTeachers = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ message: "Query parameter is required" });

    const teachers = await prisma.teacher.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { sapid: isNaN(query) ? undefined : Number(query) },
        ],
      },
    });

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

// Update teacher profile
export const updateTeacher = async (req, res) => {
  try {
    const id = req.user.id;
    const { username, email, desc } = req.body;

    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: { username, email, desc },
    });

    res.status(200).json({ message: "Teacher updated successfully", teacher: updatedTeacher });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Upload profile picture
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadProfilePic = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const profilePicUrl = result.secure_url;
    const userId = req.user.id;

    const teacher = await prisma.teacher.update({
      where: { id: userId },
      data: { pfp: profilePicUrl },
    });

    res.status(200).json({ message: "Profile picture updated", teacher });
  } catch (error) {
    res.status(400).json({ message: "Upload failed", error: error.message });
  }
};

// Delete teacher
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.user;
    await prisma.teacher.delete({ where: { id } });

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
