import express from "express";
import {
  createAssignment,
  getAllAssignments,
  getAssignmentsByTeam,
  getAssignmentsByTeacher,
  updateAssignment,
  deleteAssignment
} from "../assignment/assignmentController.js";
import { authMiddleware } from "../../middleware/authenticate.js";

const router = express.Router();

router.post("/create", authMiddleware, createAssignment); // Create assignment
router.get("/get", getAllAssignments); // Get all assignments
router.get("/team/:teamId", getAssignmentsByTeam); // Get assignments for a team
router.get("/teacher", authMiddleware, getAssignmentsByTeacher); // Get assignments by a teacher
router.put("/update/:id", authMiddleware, updateAssignment); // Update assignment
router.delete("/delete/:id", authMiddleware, deleteAssignment); // Delete assignment

export default router;
