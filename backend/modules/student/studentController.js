import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// Register a new student
export const registerStudent = async (req, res) => {
  try {
    const { sapid, username, email, password, desc } = req.body;

    const existingStudent = await prisma.student.findUnique({ where: { email } });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newStudent = await prisma.student.create({
      data: { sapid, username, email, password: hashedPassword, desc },
    });

    res.status(201).json({ message: "Student registered successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// Login student
export const loginStudent = async (req, res) => {
  try {
    const { sapid, password } = req.body;

    const student = await prisma.student.findUnique({ where: { sapid } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student.id }, process.env.TOKEN_KEY);

    res.status(200).json({ message: "Login successful", token, studentId: student.id });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student", error: error.message });
  }
};

// Get my profile (Authenticated)
export const getMyProfile = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
        where:{
            id:req.user.id
        }
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};

// Search students by name (partial match) or SAP ID
export const searchStudents = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ message: "Query parameter is required" });

    const students = await prisma.student.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } }, // Case-insensitive partial match
          { sapid: isNaN(query) ? undefined : Number(query) }, // Search by SAP ID if query is a number
        ],
      },
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

// Update student profile
export const updateStudent = async (req, res) => {
    try {
      const id = req.user.id;
      const { username, email, desc } = req.body;
      
      let updateData = { username, email, desc };

      const updatedStudent = await prisma.student.update({
        where: { id },
        data: updateData,
      });
  
      res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
      res.status(500).json({ message: "Update failed", error: error.message });
    }
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
  
export async function profilepic(req, res) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const profilePicUrl = result.secure_url;
      const userId = req.user.id;
      const student = await prisma.student.update({
        where: {
          id:userId
        },
        data: {
          pfp:profilePicUrl
        }
      });
      console.log("picture uploaded");
      return res.send(student);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
}

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.student.id;
    await prisma.student.delete({ where: { id } });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
