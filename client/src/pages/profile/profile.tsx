import { Box, Button, Typography, Divider } from '@mui/material';
import './profile.sass';

import Accounts from './account/Accounts';

export default function Profile(props: any) {
  console.log('Profile rendered!');

  return (
    <div className="profile-wrapper">
      <Accounts />
    </div>
  );
}
