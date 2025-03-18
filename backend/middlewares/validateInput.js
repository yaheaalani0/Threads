export function validateThreadData(req, res, next) {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Missing thread data' });
    }
    next();
  }