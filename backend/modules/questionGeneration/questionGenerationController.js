import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Create a new Question Generation
 */
export const createQuestionGeneration = async (req, res) => {
  try {
    const teacherId = req.user.id
    const { name } = req.body;

    if (!name || !teacherId) {
      return res.status(400).json({ error: 'Invalid input. Provide name, teacherId, and an array of documentIds.' });
    }

    const questionGeneration = await prisma.questionGeneration.create({
      data: {
        name,
        teacherId
      }
    });

    console.log('Question paper generated successfully');
    res.json({ message: 'Question paper created.', questionGeneration });

  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: 'Failed to create question paper' });
  }
};

/**
 * Get all Question Generations
 */
export const getQuestionGenerations = async (req, res) => {
  try {
    const questionGenerations = await prisma.questionGeneration.findMany({
      include: { documents: true }
    });
    res.json(questionGenerations);
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: 'Failed to fetch question generations' });
  }
};

/**
 * Get Question Generations by Teacher ID
 */
export const getQuestionGenerationsByTeacher = async (req, res) => {
  try {
    const teacherId = req.user.id

    const questionGenerations = await prisma.questionGeneration.findMany({
      where: { teacherId },
      include: { documents: true }
    });

    res.json(questionGenerations);
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: 'Failed to fetch question generations for the teacher' });
  }
};

/**
 * Get a single Question Generation by ID
 */
export const getQuestionGenerationById = async (req, res) => {
  try {
    const { id } = req.params;

    const questionGeneration = await prisma.questionGeneration.findUnique({
      where: { id },
      include: { documents: true }
    });

    if (!questionGeneration) {
      return res.status(404).json({ error: 'Question Generation not found' });
    }

    res.json(questionGeneration);
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: 'Failed to fetch question generation' });
  }
};

/**
 * Update a Question Generation
 */
export const updateQuestionGeneration = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, output } = req.body;
  
      if (!name && !output) {
        return res.status(400).json({ error: 'Provide at least a new name, output to update.' });
      }
  
      const updateData = {};
  
      if (name) updateData.name = name;
      if (output) updateData.output = output; // Updating the output field
      
  
      const updatedQuestionGeneration = await prisma.questionGeneration.update({
        where: { id },
        data: updateData,
        include: { documents: true }
      });
  
      res.json({ message: 'Question Generation updated successfully', updatedQuestionGeneration });
    } catch (error) {
      console.error(error.message || error);
      res.status(500).json({ error: 'Failed to update question generation' });
    }
  };
  

/**
 * Delete a Question Generation
 */
export const deleteQuestionGeneration = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.questionGeneration.delete({ where: { id } });
    res.json({ message: 'Question Generation deleted successfully' });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: 'Failed to delete question generation' });
  }
};
