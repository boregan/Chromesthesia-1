import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// P5 Bits
import P5Wrapper from 'react-p5-wrapper';
import sketch from "./sketch";

// Tone.js and 
import * as Tone from "tone";
import "./../style.css"

const synth = new Tone.PolySynth().toDestination();

const styles = theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

class Chromesthesia extends Component {
  constructor() {
    super();
    this.state = {color:[Math.random()*255, Math.random()*255, Math.random()*255]};
    this.randomColor = this.randomColor.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  randomColor() {
    this.setState({color:[Math.random()*255, Math.random()*255, Math.random()*255]}
    )
  };

  playNote(note) {
    synth.triggerAttackRelease(`${note}`, "8n");

    if(note === "C4"){;
      this.randomColor();
    } else if (note === "D4") {
      this.randomColor();
    } else if (note === 'E4') {
      this.randomColor();
    } else if (note === 'G4') {
      this.randomColor();
    } else if (note === 'A4') {
      this.randomColor();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  handleKey = e => {
    if(e.keyCode === 65) {
      this.playNote("C4")
    } else if (e.keyCode === 87 ) {
      this.playNote("C#4")
    } else if (e.keyCode === 83 ) {
      this.playNote("D4")
    } else if (e.keyCo4de === 69 ) {
      this.playNote("D#4")
    } else if (e.keyCode === 68 ) {
      this.playNote("E4")
    } else if (e.keyCode === 70 ) {
      this.playNote("F4")
    } else if (e.keyCode === 84 ) {
      this.playNote("F#4")
    } else if (e.keyCode === 71 ) {
      this.playNote("G4")
    } else if (e.keyCode === 89 ) {
      this.playNote("G#4")
    } else if (e.keyCode === 72 ) {
      this.playNote("A4")
    } else if (e.keyCode === 85 ) {
      this.playNote("A#4")
    } else if (e.keyCode === 74 ) {
      this.playNote("B4")
    } else if (e.keyCode === 75 ) {
      this.playNote("C5")
    }
    
    console.log(e.keyCode);
  }

  render() {
    const { classes } = this.props;
    return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          
          <P5Wrapper sketch={sketch} color={this.state.color}/>       
        </div>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
      <div className="note-wrapper">
          <button className="note white c1" onClick={() => this.playNote("C")}>
            C
          </button>
          <button className="note black" onClick={() => this.playNote("C#")}>
            C#
          </button>
          <button className="note white d" onClick={() => this.playNote("D")}>
            D
          </button>
          <button className="note black" onClick={() => this.playNote("D#")}>
            D#
          </button>
          <button className="note white e" onClick={() => this.playNote("E")}>
            E
          </button>
          <button className="note white f" onClick={() => this.playNote("F")}>
            F
          </button>
          <button className="note black" onClick={() => this.playNote("F#")}>
            F#
          </button>
          <button className="note white g" onClick={() => this.playNote("G")}>
            G
          </button>
          <button className="note black" onClick={() => this.playNote("G#")}>
            G#
          </button>
          <button className="note white a" onClick={() => this.playNote("A")}>
            A
          </button>
          <button className="note black" onClick={() => this.playNote("A#")}>
            A#
          </button>
          <button className="note white c" onClick={() => this.playNote("C5")}>
            C
          </button>
        </div>
      </Grid>


    </Grid>
    );
  }
}

export default withStyles(styles)(Chromesthesia);