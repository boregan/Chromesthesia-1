import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// P5 Bits
import P5Wrapper from 'react-p5-wrapper';
import sketch from "./sketch";
import sketch2 from "./sketch2";

// Tone.js and 
import * as Tone from "tone";
import "./../style.css";
import "./style.css";

///////////////////////////////////////////////////

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
    // Props to send to P5 Sketch
    this.state = {
      color: 'rgb(0,0,0)',
      sketch: sketch,
      rotation: 160
    };

    // Key bind handler 
    this.handleKey = this.handleKey.bind(this);
  }

  // react-hot-keys
  // onKeyDown(keyName) {
  //   if (keyName === "a+e") {
  //     console.log("Successful")
  //     // this.setState({color})
  //   }
  // }

  playNote(note) {
    // synth.voices.forEach( e => {
    //   e.envelope.attack = 0.01;
    //   e.envelope.decay = 1;
    //   e.envelope.sustain = 1;
    //   e.envelope.release = 0.5;
    //   e.oscillator.type = 'triangle'
    // })

    synth.triggerAttackRelease(`${note}`, "8n");

    var colourForNotes = { 
      'C4' : 'rgb(216, 43, 46)', 
      'C#4': 'rgb(219, 99, 53)',
      'D4' : 'rgb(231,141,55)',
      'D#4': 'rgb(242, 203, 51)',
      'E4' : 'rgb(246, 233, 95)',
      'F4' : 'rgb(192, 214, 92)',
      'F#4': 'rgb(0,159,71)',
      'G4' : 'rgb(0,152,144)',
      'G#4': 'rgb(42,50,127)',
      'A4' : 'rgb(168,146,164)',
      'A#4': 'rgb(196,44,130)',
      'B4' : 'rgb(161,44,86)',
      'C5' : 'rgb(216,43,46)'
    };

    this.setState({color: colourForNotes[note]});

    // Create a slider that uses setState
    // lerpColor(c1, c2, amt) to combine two colours 
    
    
    // Chords Colours
  }

  handleKey = (e) => {
    if(e.keyCode === 65) {
      this.playNote("C4")
    } else if (e.keyCode === 87 ) {
      this.playNote("C#4");
    } else if (e.keyCode === 83 ) {
      this.playNote("D4");
    } else if (e.keyCode === 69 ) {
      this.playNote("D#4");
    } else if (e.keyCode === 68 ) {
      this.playNote("E4");
    } else if (e.keyCode === 70 ) {
      this.playNote("F4");
    } else if (e.keyCode === 84 ) {
      this.playNote("F#4");
    } else if (e.keyCode === 71 ) {
      this.playNote("G4");
    } else if (e.keyCode === 89 ) {
      this.playNote("G#4");
    } else if (e.keyCode === 72 ) {
      this.playNote("A4");
    } else if (e.keyCode === 85 ) {
      this.playNote("A#4");
    } else if (e.keyCode === 74 ) {
      this.playNote("B4");
    } else if (e.keyCode === 75 ) {
      this.playNote("C5");
    } 
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  render() {
    const { classes } = this.props;
  
    return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <P5Wrapper sketch={this.state.sketch} color={this.state.color}/>  
          <button
            onClick={() =>
              this.setState({
                ...this.state,
                sketch: this.state.sketch === sketch ? sketch2 : sketch
              })
              // taken from react-p5-wrapper example
            }
          >
            Sketch Toggle
          </button>     
        </div>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
      <div className="note-wrapper">
          <button className="note white c1" onClick={() => this.playNote("C4")}>
            C
          </button>
          <button className="note black" onClick={() => this.playNote("C#4")}>
            C#
          </button>
          <button className="note white d" onClick={() => this.playNote("D4")}>
            D
          </button>
          <button className="note black" onClick={() => this.playNote("D#4")}>
            D#
          </button>
          <button className="note white e" onClick={() => this.playNote("E4")}>
            E
          </button>
          <button className="note white f" onClick={() => this.playNote("F4")}>
            F
          </button>
          <button className="note black" onClick={() => this.playNote("F#4")}>
            F#
          </button>
          <button className="note white g" onClick={() => this.playNote("G4")}>
            G
          </button>
          <button className="note black" onClick={() => this.playNote("G#4")}>
            G#
          </button>
          <button className="note white a" onClick={() => this.playNote("A4")}>
            A
          </button>
          <button className="note black" onClick={() => this.playNote("A#4")}>
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