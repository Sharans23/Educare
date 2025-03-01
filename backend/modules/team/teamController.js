import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// **1. Create a Team**
export const createTeam = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { name, code, desc } = req.body;

    if (!name || !code || !teacherId) {
      return res.status(400).json({ error: 'name, code, and teacherId are required.' });
    }

    const team = await prisma.team.create({
      data: {
        name,
        code,
        desc,
        teacherId
      }
    });

    res.status(201).json({ message: 'Team created successfully', team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create team' });
  }
};

// **2. Update Team**
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc } = req.body;

    const team = await prisma.team.update({
      where: { id },
      data: { name, desc }
    });

    res.json({ message: 'Team updated successfully', team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update team' });
  }
};

// **3. Get All Teams**
export const getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
        include:{
            teacher:true,
            students:true
        }
    });
    res.json({ teams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve teams' });
  }
};

export const getTeamById = async (req, res) => {
    try {
      const { id } = req.params; // Extract team ID from request params
  
      const team = await prisma.team.findUnique({
        where: { id },
        include: {
          students: true, // Include students in the team
          teacher: true, // Include teacher details
          assignments: true, // Include assignments related to the team
        },
      });
  
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
  
      res.json({ team });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve team" });
    }
};
  
// **4. Get All Teams of a Teacher**
export const getTeamsOfStudent = async (req, res) => {
  try {
    const studentId = req.user.id;

    const teams = await prisma.team.findMany({
      where: { 
        students:{
            some:{
                id:studentId
            }
        }
      },
      include:{
        students:true,
        teacher:true
      }
    });

    res.json({ teams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve teams for teacher' });
  }
};

export const getTeamsByTeacher = async (req, res) => {
    try {
      const teacherId = req.user.id;
  
      const teams = await prisma.team.findMany({
        where: { teacherId:teacherId }
      });
  
      res.json({ teams });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve teams for teacher' });
    }
  };

// **5. Add a User to a Team (By Teacher)**
export const addUserToTeam = async (req, res) => {
  try {
    const { teamId,sapid  } = req.body;

    if (!teamId || !sapid) {
      return res.status(400).json({ error: 'Team ID and SapId are required.' });
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        students: {
          connect: { sapid:sapid }
        }
      },
      include: { students: true }
    });

    res.json({ message: 'Student added to team', updatedTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add student to team' });
  }
};

// **6. Join a Team Using Team Code (By Student)**
export const joinTeamByCode = async (req, res) => {
  try {
    const code = req.body.code;
    const studentId = req.user.id

    if (!studentId || !code) {
      return res.status(400).json({ error: 'Student ID and Team Code are required.' });
    }

    const team = await prisma.team.findUnique({
      where: { code }
    });

    if (!team) {
      return res.status(404).json({ error: 'Invalid team code' });
    }

    const updatedTeam = await prisma.team.update({
      where: { id: team.id },
      data: {
        students: {
          connect: { id: studentId }
        }
      },
      include: { students: true }
    });

    res.json({ message: 'Joined team successfully', updatedTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to join team' });
  }
};