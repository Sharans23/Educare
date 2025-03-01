import express from 'express';
import { 
  createQuestionGeneration, 
  getQuestionGenerations, 
  getQuestionGenerationsByTeacher, 
  getQuestionGenerationById, 
  updateQuestionGeneration, 
  deleteQuestionGeneration 
} from '../questionGeneration/questionGenerationController.js';
import { authMiddleware } from '../../middleware/authenticate.js';

const router = express.Router();

router.post('/create',authMiddleware,createQuestionGeneration);
router.get('/get', getQuestionGenerations);
router.get('/teacher', authMiddleware,getQuestionGenerationsByTeacher);
router.get('/byId/:id', getQuestionGenerationById);
router.put('/output/:id', updateQuestionGeneration);
router.delete('/delete/:id', deleteQuestionGeneration);

export default router;
