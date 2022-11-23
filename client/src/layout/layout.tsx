import './layout.sass';
import { Box, Card, Divider, Typography } from '@mui/material';
import NavBar from './navbar';
import Footer from './footer';
import { Sidebar } from './sidebar';

export default function Layout(props: any) {
  return (
    <div className="content-wrapper">
      <div className="row"></div>
      <div className="row">
        <Sidebar />

        <div className="col-9">
          <NavBar />
          <div className="main-container container">{props.title}</div>
          {props.children}
        </div>
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
    </div>
  );
}
