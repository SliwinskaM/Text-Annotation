import express from 'express';

import { getLabels, getLabel, createLabel, deleteLabel } from '../controllers/label.js';

const router = express.Router();

router.get('/', getLabels);
router.post('/', createLabel);
router.get('/:id', getLabel);
router.delete('/:id', deleteLabel);

export default router;