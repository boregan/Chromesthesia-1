import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// P5 Bits
import P5Wrapper from 'react-p5-wrapper';
import sketch from "./sketch";
import sketch2 from "./sketch2";

// Tone.js
import * as Tone from "tone";

// Colour Picker 
import { ColorPicker } from 'material-ui-color';
import "./../style.css";
import "./style.css";

import stringifyObject from 'stringify-object';

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
  },
  color: {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
    background: 'rgb(0,0,0)',
  },
});

class Chromesthesia extends Component {
  constructor() {
    super();
    // Props to send to P5 Sketch
    this.state = {
      color: '#D82B2E', // for testing
      fill: '#D82B2E',
      sketch: sketch,
      
      // Default Colours
      c : '#D82B2E',
      db: '#DB6335',
      d : '#E78D37',
      eb: '#F2CB33',
      e : '#F6E95F',
      f : '#C0D65C',
      gb: '#009f47',
      g : '#009890',
      ab: '#2a327f',
      a : '#a892a4',
      bb: '#c42c82',
      b : '#a12c56'
    };
    // Key bind handler 
    this.handleKey = this.handleKey.bind(this);
  }

  playNote(note) {
    synth.triggerAttackRelease(`${note}`, "8n");
    var colourForNotes = { 
      'C4' :  this.state.c, 
      'C#4':  this.state.db,
      'D4' :  this.state.d,
      'D#4':  this.state.eb,
      'E4' :  this.state.e,
      'F4' :  this.state.f,
      'F#4':  this.state.gb,
      'G4' :  this.state.g,
      'G#4':  this.state.ab,
      'A4' :  this.state.a,
      'A#4':  this.state.bb,
      'B4' :  this.state.b,
    };
    this.setState({fill: colourForNotes[note]});
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
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  // make it have two arguments, 2nd one is idenfitier 
  // if (identifier) then this.setState({name : ''})

  handleChange = (value, key) => {
    // stringify-object to remove double quotes 
    var hex = stringifyObject(value.hex, {
      doubleQuotes: false,
    });
    hex = hex.replace(/\'/gi,'');
    console.log(hex, key);

    this.setState({fill: '#' + [hex]});

    if(key === "C") {
      this.setState({c: '#' + [hex]});
    } else if (key === "C#") {
      this.setState({db: '#' + [hex]});
    } else if (key === "D") {
      this.setState({d: '#' + [hex]});
    } else if (key === "D#") {
      this.setState({eb: '#' + [hex]});
    } else if (key === "E") {
      this.setState({e: '#' + [hex]});
    } else if (key === "F") {
      this.setState({f: '#' + [hex]});
    } else if (key === "F#") {
      this.setState({gb: '#' + [hex]});
    } else if (key === "G") {
      this.setState({g: '#' + [hex]});
    } else if (key === "G#") {
      this.setState({ab: '#' + [hex]});
    } else if (key === "A") {
      this.setState({a: '#' + [hex]});
    } else if (key === "A#") {
      this.setState({bb: '#' + [hex]});
    } else if (key === "B") {
      this.setState({b: '#' + [hex]});
    } 
  };

  render() {
    const { classes } = this.props;
  
    return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <P5Wrapper 
            sketch ={this.state.sketch} 
            fill={this.state.fill}
          />  
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
            <div className="picker">
              <ColorPicker 
                value={this.state.c} 
                onChange={(e) => this.handleChange(e, "C")}
                deferred 
                disableTextfield 
                disableAlpha
                name="C"
              />
            </div>
          </button>
          <button className="note black" onClick={() => this.playNote("C#4")}>
            <div className="picker-black">
              <ColorPicker 
                value={this.state.db} 
                onChange={(e) => this.handleChange(e, "C#")}
                deferred 
                disableTextfield 
                disableAlpha
                name="C#4"
              />
              </div>
          </button>

          <button className="note white d" onClick={() => this.playNote("D4")}>
            <div className="picker">
              <ColorPicker 
                value={this.state.d} 
                onChange={(e) => this.handleChange(e, "D")}
                deferred 
                disableTextfield 
                disableAlpha
              />
            </div>
          </button>

          <button className="note black" onClick={() => this.playNote("D#4")}>
          <div className="picker-black">
              <ColorPicker 
                className="picker" 
                value={this.state.eb} 
                onChange={(e) => this.handleChange(e, "D#")}
                deferred 
                disableTextfield 
                disableAlpha
              />
            </div>
          </button>

          <button className="note white e" onClick={() => this.playNote("E4")}>
          <div className="picker">
              <ColorPicker 
                className="picker" 
                value={this.state.e} 
                onChange={(e) => this.handleChange(e, "E")}
                deferred 
                disableTextfield 
                disableAlpha
              />
            </div>
          </button>

          <button className="note white f" onClick={() => this.playNote("F4")}>
          <div className="picker">
              <ColorPicker 
                value={this.state.f} 
                onChange={(e) => this.handleChange(e, "F")}
                deferred 
                disableTextfield 
                disableAlpha
              />
            </div>
          </button>

          <button className="note black" onClick={() => this.playNote("F#4")}>
            <div className="picker-black">
              <ColorPicker 
                value={this.state.gb} 
                onChange={(e) => this.handleChange(e, "F#")}
                deferred 
                disableTextfield 
                disableAlpha
              />
            </div>
          </button>

          <button className="note white g" onClick={() => this.playNote("G4")}>
            <div className="picker">
                <ColorPicker 
                  value={this.state.g} 
                  onChange={(e) => this.handleChange(e, "G")}
                  deferred 
                  disableTextfield 
                  disableAlpha
                />
            </div>
          </button>

          <button className="note black" onClick={() => this.playNote("G#4")}>
            <div className="picker-black">
              <ColorPicker 
                value={this.state.ab} 
                onChange={(e) => this.handleChange(e, "G#")}
                deferred 
                disableTextfield 
                disableAlpha
              />
            </div>
          </button>

          <button className="note white a" onClick={() => this.playNote("A4")}>
            <div className="picker">
              <ColorPicker 
                value={this.state.a} 
                onChange={(e) => this.handleChange(e, "A")}
                deferred 
                disableTextfield 
                disableAlpha
              />
            </div>
          </button>

          <button className="note black" onClick={() => this.playNote("A#4")}>
            <div className="picker-black">
              <ColorPicker 
                value={this.state.bb} 
                onChange={(e) => this.handleChange(e, "A#")}
                deferred 
                disableTextfield 
                disableAlpha
              />
            </div>
          </button>

          <button className="note white b" onClick={() => this.playNote("B4")}>
            <div className="picker">
              <ColorPicker 
                value={this.state.b} 
                onChange={(e) => this.handleChange(e, "B")}
                deferred 
                disableTextfield 
                disableAlpha
              />
            </div>
          </button>
        </div>
      </Grid>
    </Grid>
    );
  }
}

export default withStyles(styles)(Chromesthesia);