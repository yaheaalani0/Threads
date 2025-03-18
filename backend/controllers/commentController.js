import db from '../utils/db.js';

// Hämta alla kommentarer för en specifik tråd
export function getCommentsByThread(req, res) {
  const { threadId } = req.params;
  const comments = db
    .prepare('SELECT * FROM comments WHERE threadId = ?')
    .all(threadId);
  return res.json(comments);
}

// Skapa kommentar
export function createComment(req, res) {
  const { threadId } = req.params;
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Missing content' });
  }
  const info = db
    .prepare('INSERT INTO comments (threadId, content) VALUES (?, ?)')
    .run(threadId, content);
  return res.json({ id: info.lastInsertRowid, threadId, content });
}

// Uppdatera kommentar
export function updateComment(req, res) {
  const { id } = req.params;
  const { content } = req.body;
  const comment = db
    .prepare('SELECT id FROM comments WHERE id = ?')
    .get(id);
  if (!comment) {
    return res.status(404).json({ error: 'Not found' });
  }
  db.prepare('UPDATE comments SET content = ? WHERE id = ?')
    .run(content, id);
  return res.json({ id, content });
}

// Ta bort kommentar
export function deleteComment(req, res) {
  const { id } = req.params;
  db.prepare('DELETE FROM comments WHERE id = ?').run(id);
  return res.json({ success: true });
}
