import React, { useEffect, useState, setState } from "react";
import P5Wrapper from 'react-p5-wrapper';
import { Container } from '@material-ui/core';

import './style.css';

export default function sketch (p) {
	// const [p5, setP5] = useState();

	let canvas;

	// useEffect(() => {
	// 	// useEffect is redrawing the canvas when the window is resized to match the available space. Currently broken. 
	// 	window.addEventListener("resize", windowResized);

	// 	return () => window.removeEventListener("resize", windowResized);
	// }, []);

	// function windowResized() {
	// 	if (p5) {
	// 		p5.resizeCanvas(document.documentElement.clientWidth /2, document.documentElement.clientHeight).parent('myContainer');
	// 		p5.redraw();
	// 	}
	// }

	// const setup = (p5, canvasParentRef) => {
	// 	// use parent to render the canvas in this ref
	// 	// (without that p5 will render the canvas outside of your component)

	// 	//set to state
	// 	// setP5(p5);
	// 	canvas = p5.createCanvas(document.documentElement.clientWidth /2, document.documentElement.clientHeight).parent(canvasParentRef);
	// };

	p.setup = () => {
		canvas = p.createCanvas(300,200);
		p.noStroke();
	}

	p.draw = () => {
		// The following was taken from the react-p5 docs:
		
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes

		// DRAWING ONE 
		// Other sketches removed for now to clean up code
		p.push();

		var sc = 128 + p.sin(p.frameCount/50) * 128;
		var x = p.width/2 + p.cos(p.frameCount/30) * 120;
		var y = p.height/2 + p.sin(p.frameCount/30) * 120;

		p.rect(0,0, p.width, p.height);
		p.stroke(sc, 100);

		for (var i = 0; i < p.width; i += 10) {
			p.line(i, 0, x, y);
		}
		for (i = 0; i < p.width; i += 10) {
			p.line(i, p.height, x, y);		
		}
		for (i = 0; i < p.height; i += 10) {
			p.line(0, i, x, y);		
		}
		for (i = 0; i <= p.height; i += 10) {
			p.line(p.width, i, x, y);		
		}

		///////////////////////////////////////
		
		// DRAWING TWO
		
	};

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
		if(canvas) //Make sure the canvas has been created
		  p.fill(newProps.color);
	}

	// return (
	// 	<div id="myContainer">
	// 	<Container id="myContainer">
	// 		<Sketch setup={setup} draw={draw} />
	// 	</Container>
	// 	</div>
	// )
}