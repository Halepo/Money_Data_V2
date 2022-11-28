import { Box, Button, Container } from '@mui/material';
import { useContext } from 'react';

export default function Footer() {

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: "#fff",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(5px + 1vmin)',
        color: 'white',
      }}
    >
      Zemichael M.
      <Container sx={{ display: 'flex', margin: 'auto', my: 4 }}>
        <Box
          sx={{
            display: 'flex',
          }}
        ></Box>
        <Box
          sx={{
            margin: 'auto',
            marginRight: '0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
        </Box>
      </Container>
    </Box>
  );
}
