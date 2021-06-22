import express from 'express';

import { getLabels, getLabel, createLabel, deleteLabel, deleteLabelByInnerId } from '../controllers/label.js';

const router = express.Router();

router.get('/', getLabels);
router.post('/', createLabel);
router.get('/:id', getLabel);
router.delete('/:id', deleteLabel);
router.delete('/inner/:id', deleteLabelByInnerId);

export default router;