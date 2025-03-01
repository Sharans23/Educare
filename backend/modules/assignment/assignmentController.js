import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create an Assignment
export const createAssignment = async (req, res) => {
  try {
    const teacherId = req.user?.id;
    const { name, teamId, desc, deadline } = req.body;

    if (!teacherId || !name || !teamId || !deadline) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const assignment = await prisma.assignment.create({
      data: {
        name,
        desc,
        deadline: new Date(deadline),
        teamId,
        teacherId,
      }
    });

    res.status(201).json({ message: "Assignment created successfully", assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create assignment" });
  }
};

// Get all Assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      include: { team: true, teacher: true, documents: true }
    });

    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve assignments" });
  }
};

// Get Assignments by Team
export const getAssignmentsByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const assignments = await prisma.assignment.findMany({
      where: { teamId },
      include: { documents: true }
    });

    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve assignments" });
  }
};

// Get Assignments by Teacher
export const getAssignmentsByTeacher = async (req, res) => {
  try {
    const teacherId = req.user?.id;

    const assignments = await prisma.assignment.findMany({
      where: { teacherId },
      include: { team: true, documents: true }
    });

    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve assignments" });
  }
};

// Update an Assignment
export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, deadline, documents } = req.body;

    const assignment = await prisma.assignment.update({
      where: { id },
      data: {
        name,
        desc,
        deadline: deadline ? new Date(deadline) : undefined,
        documents: documents ? { set: documents } : undefined
      }
    });

    res.json({ message: "Assignment updated successfully", assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update assignment" });
  }
};

// Delete an Assignment
export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.assignment.delete({ where: { id } });

    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete assignment" });
  }
};
