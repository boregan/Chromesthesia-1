import React, { useState, Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// P5 Bits
import P5Wrapper from 'react-p5-wrapper';
import sketch from "./sketch";


// Tone.js and 
import Synth from "./Synth";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Chromesthesia extends Component {
  constructor() {
  // const classes = useStyles();

    super();
    this.state = {color:[Math.random()*255, Math.random()*255, Math.random()*255]};
    this.randomColor = this.randomColor.bind(this);
  }

  randomColor() {
    this.setState({color:[Math.random()*255, Math.random()*255, Math.random()*255]}
    )
  };

  render() {
    return (
    <Grid container component="main">
      <CssBaseline />

      <Grid item xs={false} sm={4} md={6}>
        <button onClick={this.randomColor}>Random Colour</button> 
        <Synth/>
      </Grid>

      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div>
          
          <P5Wrapper sketch={sketch} color={this.state.color}/>       
        </div>
      </Grid>
    </Grid>
    );
  }
}

export default Chromesthesia;