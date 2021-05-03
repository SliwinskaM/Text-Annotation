import express from 'express';

import { getDocuments, getDocument, createDocument, deleteDocument } from '../controllers/add.js';

const router = express.Router();

router.get('/', getDocuments);
router.post('/', createDocument);
router.get('/:id', getDocument);
router.delete('/:id', deleteDocument);

export default router;