import { Router } from 'express';
import { getCommentsByThread, createComment, updateComment, deleteComment } from '../controllers/commentController.js';

const router = Router();
router.get('/:threadId', (req, res) => getCommentsByThread(req, res));
router.post('/:threadId', (req, res) => createComment(req, res));
router.put('/comment/:id', (req, res) => updateComment(req, res));
router.delete('/comment/:id', (req, res) => deleteComment(req, res));

export default router;