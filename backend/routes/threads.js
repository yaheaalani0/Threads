import { Router } from 'express';
import { getAllThreads, getThreadById, createThread, updateThread, deleteThread } from '../controllers/threadController.js';

const router = Router();
router.get('/', (req, res) => getAllThreads(req, res));
router.get('/:id', (req, res) => getThreadById(req, res));
router.post('/', (req, res) => createThread(req, res));
router.put('/:id', (req, res) => updateThread(req, res));
router.delete('/:id', (req, res) => deleteThread(req, res));

export default router;