import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Join.css';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';


export default function Join() {

  // Fetch Groups
  const [group, setGroups] = useState([]);

  useEffect(() => {
    // Simulate fetching groups from an API
    setGroups([
      { id: 1, name: 'Game 1' },
      { id: 2, name: 'Game 2' },
      { id: 3, name: 'Game 3' },
      // Add more games as needed
    ]);
  }, []);

  // Fetch games
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Simulate fetching games from an API
    setGames([
      { id: 1, name: 'Game 1' },
      { id: 2, name: 'Game 2' },
      { id: 3, name: 'Game 3' },
      // Add more games as needed
    ]);
  }, []);

return (
 <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Typography variant="h4" gutterBottom>
        Available Games
      </Typography>

      <Stack spacing={2} width="100%" maxWidth={600}>
        {games.map((game) => (

          <Paper key={game.id} elevation={3} sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="stretch" flexDirection="column">
              <Typography variant="h6">{game.name}</Typography>
              {group.map((group) => (
                <Button key={group.id} variant="contained" color="primary" component={Link} to={`/game/${game.id}/group/${group.id}`}>
                  {group.name}
                </Button>
              ))
              }
              <FormGroup row>
		<TextField
		  label="Ny grupp"
		  id="filled-size-normal"
		  variant="filled"
                  flex="2"
		/>
                <Button variant="contained" color="primary" component={Link} to={`/game/${game.id}`}>
                  Skapa
                </Button>
              </FormGroup> 
            </Box>
          </Paper>
        ))}

      </Stack>
    </Box>
  );
}

