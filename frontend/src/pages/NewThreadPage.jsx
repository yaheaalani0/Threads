import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box } from '@mui/material';

function NewThreadPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3001/api/threads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(data => navigate(`/thread/${data.id}`))
      .catch(console.error);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" component="h1" align="center">
        Skapa ny tråd
      </Typography>
      <TextField
        label="Titel"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Innehåll"
        value={content}
        onChange={e => setContent(e.target.value)}
        multiline
        rows={4}
        fullWidth
        required
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
      >
        Skapa tråd
      </Button>
    </Box>
  );
}

export default NewThreadPage;
