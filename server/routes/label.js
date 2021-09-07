import express from 'express';

import { getLabels, getLabelById, getFilteredLabels, createLabel, deleteLabel, deleteLabelByInnerId } from '../controllers/label.js';

const router = express.Router();

router.get('/all/', getLabels);
router.get('/', getFilteredLabels);
router.post('/', createLabel);
router.get('/:id', getLabelById);
// router.get('/', getLabel);
router.delete('/:id', deleteLabel);
router.delete('/inner/:id', deleteLabelByInnerId);

export default router;