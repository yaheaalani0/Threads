import express from 'express';
import cors from 'cors';
import rootRouter from './routes/index.js';
import threadsRouter from './routes/threads.js';
import commentsRouter from './routes/comments.js';

const app = express();
app.use(cors());
app.use(express.json());

// Enkla rutter:
app.use('/', rootRouter);              // ger "Välkommen till forumets backend!"
app.use('/api/threads', threadsRouter);
app.use('/api/comments', commentsRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
