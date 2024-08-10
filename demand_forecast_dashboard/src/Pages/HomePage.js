import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import homepage_img from "../Assets/homepage_img.jpg";
import Navbar from '../Components/Navbar';

export default function HomePage() {
  return (
    <>
    <Navbar/>
    <Grid container spacing={15} style={{marginLeft:'80px',alignItems:"center"}}>
      {/* Left Side */}
      <Grid item xs={8} md={4} style={{ display: 'flex', flexDirection:'column', justifyContent: 'Left',marginTop:'20px',padding:'10px' }}>
        <Typography variant="h1" style={{ fontWeight: 'bold' }}>
          Forecast
        </Typography>
        <Typography variant="h2" style={{ color: 'gray' }}>
          Pro
        </Typography>
        <Button variant="contained" style={{ backgroundColor: '#FFC220', color: 'white', marginTop: '20px', width: '150px',alignItems:'flex-start' }}>
          Let’s go
        </Button>
      </Grid>

      {/* Right Side */}
      <Grid item xs={16} md={8}>
        <img src={homepage_img} alt="Forecast" style={{ width: '73%', height: 'auto',marginTop:'0px' }} />
      </Grid>
    </Grid>
    </>
  );
}
