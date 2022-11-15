import './layout.sass';
import { Box, Card, Divider, Typography } from '@mui/material';
import NavBar from './navbar';
import Footer from './footer';
import { Sidebar } from './sidebar';

export default function Layout(props: any) {
  return (
    <>
      <NavBar />

      <Sidebar />
      <div className="main-container container">
        <div>{props.title}</div>
        {props.children}
      </div>

      <Footer />

      {/* <Typography variant="h5"></Typography>
      <Divider
        sx={{
          width: '80%',
          height: '.1rem',
          backgroundColor: 'gray',
          marginBottom: '2rem',
        }}
      /> */}
    </>
  );
}
