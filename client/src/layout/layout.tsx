import { Box, Card } from '@mui/material';
import NavBar from './navbar';
import Footer from './footer';
import { Sidebar } from './sidebar';

export default function Layout(props: any) {
  return (
    <>
      {/* <NavBar /> */}
      <Sidebar />
      {/* <Typography variant="h5">{props.title}</Typography>
      <Divider
        sx={{
          width: '80%',
          height: '.1rem',
          backgroundColor: 'gray',
          marginBottom: '2rem',
        }}
      /> */}
      {props.children}
      {/* <Footer /> */}
    </>
  );
}
