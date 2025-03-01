import { PrismaClient } from '@prisma/client';
import cloudinary from 'cloudinary';

const prisma = new PrismaClient();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadDocument = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const { assignmentId, submissionId, questionGenerationId } = req.body;
    if (!assignmentId && !submissionId && !questionGenerationId) {
      return res.status(400).json({ error: 'Provide either assignmentId, submissionId, or questionGenerationId' });
    }

    const uploadedDocs = [];

    for (const file of req.files) {
      const result = await cloudinary.v2.uploader.upload(file.path);
      const document = await prisma.document.create({
        data: {
          document: result.secure_url,
          assignmentId,
          submissionId,
          questionGenerationId
        }
      });
      uploadedDocs.push(document);
    }

    console.log('Documents uploaded successfully');
    res.json({ message: 'Documents uploaded and saved.', documents: uploadedDocs });

  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: error.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const documents = await prisma.document.findMany();
    res.json(documents);
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.document.delete({ where: { id } });
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
};
