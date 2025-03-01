import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import studentRoutes from './modules/student/studentRoute.js'
app.use('/student',studentRoutes)

import teacherRoutes from './modules/teacher/teacherRoute.js'
app.use('/teacher',teacherRoutes)

import documentRoutes from './modules/document/documentRoute.js'
app.use('/document',documentRoutes)

import questionGenerationRoutes from './modules/questionGeneration/questionRoute.js'
app.use('/questionGeneration',questionGenerationRoutes)