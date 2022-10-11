import { Box, Button, Typography, Divider } from '@mui/material';

import Accounts from './account/Accounts';

export default function Profile(props: any) {
  console.log('Profile rendered!');

  return (
    <Box
      sx={{
        margin: 0,
        backgroundColor: '#e7ebf0',
        width: '100%',
        padding: '2rem',
        paddingBottom: '3rem',
      }}
    >
      <Accounts />
    </Box>
  );
}
