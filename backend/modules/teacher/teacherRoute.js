import express from "express";
import {
  registerTeacher,
  loginTeacher,
  getAllTeachers,
  getTeacherById,
  getMyProfile,
  searchTeachers,
  updateTeacher,
  deleteTeacher,
  uploadProfilePic
} from "./teacherController.js";
import { authMiddleware } from "../../middleware/authenticate.js";
import uploadMiddleware from "../../middleware/multer.js";

const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.get("/all", getAllTeachers);
router.get("/get/:id", getTeacherById);
router.get("/me", authMiddleware, getMyProfile);
router.get("/search", searchTeachers);
router.put("/update", authMiddleware, updateTeacher);
router.delete("/delete/:id", authMiddleware, deleteTeacher);
router.post("/uploadpic", uploadMiddleware.single("image"), authMiddleware, uploadProfilePic);

export default router;
