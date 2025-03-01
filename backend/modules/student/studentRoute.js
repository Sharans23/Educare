import express from "express";
import {
  registerStudent,
  loginStudent,
  getAllStudents,
  getStudentById,
  getMyProfile,
  searchStudents,
  updateStudent,
  deleteStudent,
  profilepic
} from "./studentController.js";
import { authMiddleware } from "../../middleware/authenticate.js";
import uploadMiddleware from "../../middleware/multer.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/all", getAllStudents);
router.get("/get/:id", getStudentById);
router.get("/me", authMiddleware, getMyProfile);
router.get("/search", searchStudents);
router.put("/update", authMiddleware, updateStudent);
router.delete("/delete/:id", authMiddleware, deleteStudent);
router.post('/uploadpic',uploadMiddleware.single('image'),authMiddleware,profilepic);

export default router;
