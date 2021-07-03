import express from 'express';

import { getRelations, getRelation, createRelation, deleteRelation } from '../controllers/relation.js';

const router = express.Router();

router.get('/', getRelations);
router.post('/', createRelation);
router.get('/:id', getRelation);
router.delete('/:id', deleteRelation);

export default router;