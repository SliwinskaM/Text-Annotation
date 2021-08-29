import express from 'express';

import { createUser, getUser, getUsers } from '../controllers/auth.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', getUser);

export default router;