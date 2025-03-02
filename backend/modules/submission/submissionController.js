import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Submission (Check Deadline)
export const createSubmission = async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming student is authenticated
    const { assignmentId, desc } = req.body;

    // Check if assignment exists and get the deadline
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { deadline: true },
    });

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Check if current date is past the deadline
    const currentDate = new Date();
    if (currentDate > assignment.deadline) {
      return res.status(400).json({ error: "Deadline has passed. Submission not allowed." });
    }

    const submission = await prisma.submission.create({
      data: {
        studentId,
        assignmentId,
        desc
      },
    });

    res.status(201).json({ message: "Submission created successfully", submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create submission" });
  }
};

// View My Submissions (Student)
export const getMySubmissions = async (req, res) => {
  try {
    const studentId = req.user.id;

    const submissions = await prisma.submission.findMany({
      where: { studentId },
      include: { student: true,assignment:true,documents:true  },
    });

    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};

// View All Submissions of an Assignment (Teacher)
export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await prisma.submission.findMany({
      where: { assignmentId },
      include: { student: true,assignment:true,documents:true },
    });

    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};

// View Submission by ID
export const getSubmissionById = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: { student: true, assignment: true },
    });

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch submission" });
  }
};

// View Submission by UserID and AssignmentID
export const getUserSubmissionForAssignment = async (req, res) => {
  try {
    const { userId, assignmentId } = req.params;

    const submission = await prisma.submission.findFirst({
      where: { studentId: userId, assignmentId },
      include: { student: true, assignment: true, documents:true},
    });

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch submission" });
  }
};

// Update Submission
export const updateSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { desc, documents, marks, remarks } = req.body;

    const updatedSubmission = await prisma.submission.update({
      where: { id: submissionId },
      data: { desc, documents, marks, remarks, updatedAt: new Date() },
    });

    res.status(200).json({ message: "Submission updated successfully", updatedSubmission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update submission" });
  }
};

// Delete Submission
export const deleteSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;

    await prisma.submission.delete({
      where: { id: submissionId },
    });

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete submission" });
  }
};
