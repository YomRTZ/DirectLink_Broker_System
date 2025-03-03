
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
const cardTitles = [
  "Addis Ketema",
  "Akaki Kaliti",
  "Arada",
  "Bole",
  "Gullele",
  "Kirkos",
  "Lideta",
  "Lemi Kura",
  "Nifas Silk-Lafto",
  "Yeka",
  "Kolfe Keranio",
];

export default function Analytics() {
  const navigate = useNavigate();
  const handleCardClick = (title) => {
    const formattedTitle = encodeURIComponent(title); 
    navigate(`/statistics/${formattedTitle}`); 
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Analytics
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Grid Layout */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {cardTitles.map((title, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ width: '100%' }} onClick={() => handleCardClick(title)}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click to analyze {title}.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
