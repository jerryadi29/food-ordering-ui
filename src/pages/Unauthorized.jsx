import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Unauthorized = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1">
          You do not have permission to view this page.
        </Typography>
      </Box>
    </Container>
  );
};

export default Unauthorized;