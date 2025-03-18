import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

function ThreadPage() {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/api/threads/${id}`)
      .then((res) => res.json())
      .then((data) => setThread(data))
      .catch(console.error);

    fetch(`http://localhost:3001/api/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(console.error);
  }, [id]);

  function handleCommentSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    })
      .then((res) => res.json())
      .then((added) => {
        setComments((prev) => [...prev, added]);
        setNewComment("");
      })
      .catch(console.error);
  }

  if (!thread)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      {/* Thread Content */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: "background.paper" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {thread.title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {thread.content}
        </Typography>
      </Paper>
      <Divider sx={{ mb: 4 }} />
      {/* Comments Section */}
      <Typography variant="h5" component="h2" gutterBottom>
        Kommentarer
      </Typography>
      <List>
        {comments.map((c) => (
          <ListItem key={c.id}>
            <Card variant="outlined" sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {c.content}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      {/* New Comment Form */}
      <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 4 }}>
        <TextField
          id="comment"
          label="Ny kommentar"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Skriv din kommentar här..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
        >
          Skicka
        </Button>
      </Box>
    </Box>
  );
}

export default ThreadPage;
