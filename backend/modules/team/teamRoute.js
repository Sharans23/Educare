import express from 'express';
import { 
  createTeam, 
  updateTeam, 
  getAllTeams, 
  getTeamsByTeacher, 
  addUserToTeam, 
  joinTeamByCode,
  getTeamById,
  getTeamsOfStudent
} from '../team/teamController.js';
import { authMiddleware } from '../../middleware/authenticate.js';

const router = express.Router();

router.post('/create',authMiddleware, createTeam);
router.put('/update/:id', updateTeam);
router.get('/all', getAllTeams);
router.get('/teacher',authMiddleware, getTeamsByTeacher);
router.get('/student',authMiddleware, getTeamsOfStudent);
router.post('/add-user', addUserToTeam);
router.post('/join',authMiddleware, joinTeamByCode);
router.get("/byId/:id", getTeamById);

export default router;
