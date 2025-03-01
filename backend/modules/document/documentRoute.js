import express from 'express';
import { uploadDocument, getDocuments, deleteDocument } from '../document/documentController.js';
import uploadMiddleware from "../../middleware/multer.js";

const router = express.Router();

router.post('/upload', uploadMiddleware.array('documents'), uploadDocument);
router.get('/', getDocuments);
router.delete('/:id', deleteDocument);

export default router;
