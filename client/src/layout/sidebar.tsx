import * as React from 'react';
import './sidebar.sass'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MailIcon from '@mui/icons-material/Mail';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import {
  ListItemText,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Avatar,
} from '@mui/material';

import { sidebarItems } from './sidebarItems';

type Anchor = 'left';

export function Sidebar() {
  const [state, setState] = React.useState({ left: false });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const anchor: Anchor = 'left';
  return (
    <>
    <nav className="responsive-nav nav flex-column">
  <a className="nav-link active" href="#">Active</a>
  <a className="nav-link" href="#">Link</a>
  <a className="nav-link" href="#">Link</a>
  <a className="nav-link disabled" href="#">Disabled</a>
</nav>
    {/* <Box
      sx={{
        width: '250px',
        position: 'fixed',
        top: '2%',
        left: '1%',
        height: '95%',
        padding: '1rem',
        borderRadius: '1rem',
        backgroundColor: 'white',
        zIndex: '1000',
        // overflow: 'scroll',
      }}
    >
        <a className="nav-link active" href="#">Active</a>
  <a className="nav-link" href="#">Link</a>
  <a className="nav-link" href="#">Link</a>
  <a className="nav-link disabled" href="#">Disabled</a>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '1rem',
          marginBottom: '2rem',
        }}
      >
        <RequestQuoteIcon fontSize="large" />
        <Typography
          sx={{ marginLeft: '1rem', color: '#003049' }}
          variant="h6"
          component="h1"
          gutterBottom
        >
          Money Manager
        </Typography>
      </Box>
      <Divider sx={{ height: '1px', marginBottom: '1rem', color: '#000' }} />
      <Box>
        <List>
          {sidebarItems.map((item) => {
            return (
              <ListItem>
                <ListItemButton
                  sx={{
                    backgroundColor: '#e5e5e5',
                    borderRadius: '.5rem',
                  }}
                >
                  <ListItemIcon sx={{}}>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '1rem',
          position: 'absolute',
          bottom: '2rem',
          padding: '.5rem',
          borderRadius: '1rem',
        }}
      >
        <Divider />
        <Avatar>Z</Avatar>
        <Typography variant="subtitle1" sx={{ marginLeft: '1rem' }}>
          Zemichael Mehretu
        </Typography>
      </Box>
    </Box> */}
    </>
  );

  // return (
  //   <div>
  //     <React.Fragment key={anchor}>
  //       <Button onClick={toggleDrawer(anchor, true)}>
  //         <Button>hello</Button>
  //       </Button>
  //       <Drawer
  //         anchor={anchor}
  //         open={state[anchor]}
  //         onClose={toggleDrawer(anchor, false)}
  //       >
  //         {list}
  //       </Drawer>
  //     </React.Fragment>
  //   </div>
  // );
}
