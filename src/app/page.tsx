"use client";
import * as React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  const handleStartLearning = () => {
    router.push('/study');
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundColor: 'transparent', // No background
          color: 'white', // White text color for dark theme
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white' }}>
            Flash Card Memory'ye Hoş Geldiniz
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
           Kartlar ile yeni kelimeler öğrenmeye başlayın!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartLearning}
            sx={{
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: 2,
            }}
          >
            Öğrenmeye Başla
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
