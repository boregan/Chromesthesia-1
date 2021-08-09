// Material.js piano buttons- how to make 

import React from "react";
import "./../style.css";
import * as Tone from "tone";


export default function Synth() {
    const synth = new Tone.Synth().toDestination();

    function playNote(note) {
        synth.triggerAttackRelease(`${note}4`, "8n");

        if(note === "C"){
          console.log('tapped');
        } else if (note === "D") {
          console.log('othertapped');
        } else if (note === 'E') {
          console.log("E");
        } else if (note === 'G') {
          console.log("G");
        }
    }

    
    return (
        // Insert piano notes here 
        <div className="App">
        <div className="note-wrapper">
          <button id="C" className="note" onClick={() => playNote("C")}>
            C
          </button>
          <button className="note" onClick={() => playNote("D")}>
            D
          </button>
          <button className="note" onClick={() => playNote("E")}>
            E
          </button>
          <button className="note" onClick={() => playNote("G")}>
            G
          </button>
          <button className="note" onClick={() => playNote("A")}>
            A
          </button>
        </div>
      </div>
    )
}
