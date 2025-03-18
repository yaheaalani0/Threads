import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => res.send('Välkommen till forumets backend!'));
export default router;