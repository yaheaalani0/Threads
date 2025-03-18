import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, List, ListItem, Paper, Box } from '@mui/material';

function HomePage() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/threads")
      .then(res => res.json())
      .then(data => setThreads(data))
      .catch(console.error);
  }, []);

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Forum
      </Typography>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button
          component={RouterLink}
          to="/new"
          variant="contained"
          color="primary"
        >
          Skapa ny tråd
        </Button>
      </Box>
      <List>
        {threads.map(thread => (
          <ListItem key={thread.id} sx={{ px: 0 }}>
            <Paper 
              sx={{ 
                p: 2, 
                width: '100%',
                '&:hover': { bgcolor: 'grey.50' }
              }}
            >
              <RouterLink 
                to={`/thread/${thread.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography variant="h6">{thread.title}</Typography>
              </RouterLink>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default HomePage;