import express from "express";
import {
  createSubmission,
  getMySubmissions,
  getSubmissionsByAssignment,
  getSubmissionById,
  getUserSubmissionForAssignment,
  updateSubmission,
  deleteSubmission,
} from "./submissionController.js";
import { authMiddleware } from "../../middleware/authenticate.js"; // Ensure user is logged in

const router = express.Router();

// Create submission (Student)
router.post("/create", authMiddleware, createSubmission);

// Get my submissions (Student)
router.get("/my-submissions", authMiddleware, getMySubmissions);

// Get all submissions for an assignment (Teacher)
router.get("/assignment/:assignmentId", authMiddleware, getSubmissionsByAssignment);

// Get submission by ID
router.get("/byId/:submissionId", getSubmissionById);

// Get submission by UserID and AssignmentID
router.get("/:userId/assignment/:assignmentId", getUserSubmissionForAssignment);

// Update submission
router.put("/:submissionId", updateSubmission);

// Delete submission
router.delete("/:submissionId", authMiddleware, deleteSubmission);

export default router;
