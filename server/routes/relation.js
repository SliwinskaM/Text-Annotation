import express from 'express';

import { getRelations, getFilteredRelations, getRelation, createRelation, deleteRelation } from '../controllers/relation.js';

const router = express.Router();

router.get('/all/', getRelations);
router.get('/', getFilteredRelations)
router.post('/', createRelation);
router.get('/:id', getRelation);
router.delete('/:id', deleteRelation);

export default router;