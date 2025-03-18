import db from "../utils/db.js";

// Hämta alla trådar
export function getAllThreads(req, res) {
  const threads = db.prepare("SELECT * FROM threads").all();
  return res.json(threads);
}

// Hämta en tråd
export function getThreadById(req, res) {
  const { id } = req.params;
  const thread = db.prepare("SELECT * FROM threads WHERE id = ?").get(id);
  return thread
    ? res.json(thread)
    : res.status(404).json({ error: "Not found" });
}

// Skapa ny tråd
export function createThread(req, res) {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Missing title or content" });
  }
  const info = db
    .prepare("INSERT INTO threads (title, content) VALUES (?, ?)")
    .run(title, content);
  return res.json({ id: info.lastInsertRowid, title, content });
}

// Uppdatera tråd
export function updateThread(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const thread = db.prepare("SELECT id FROM threads WHERE id = ?").get(id);
  if (!thread) {
    return res.status(404).json({ error: "Not found" });
  }

  db.prepare("UPDATE threads SET title = ?, content = ? WHERE id = ?").run(
    title,
    content,
    id
  );
  return res.json({ id, title, content });
}

// Ta bort tråd
export function deleteThread(req, res) {
  const { id } = req.params;
  db.prepare("DELETE FROM threads WHERE id = ?").run(id);
  return res.json({ success: true });
}
