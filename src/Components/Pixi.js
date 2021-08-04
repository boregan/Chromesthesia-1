import React, { useEffect, useState, setState } from "react";
import Sketch from "react-p5";
import { Container } from '@material-ui/core';

import './style.css';

const Pixi = (props) => {
	const [p5, setP5] = useState();

	useEffect(() => {
		// useEffect is redrawing the canvas when the window is resized to match the available space. Currently broken. 
		window.addEventListener("resize", windowResized);

		return () => window.removeEventListener("resize", windowResized);
	}, []);

	function windowResized() {
		if (p5) {
			p5.resizeCanvas(document.documentElement.clientWidth /2, document.documentElement.clientHeight).parent('myContainer');
			p5.redraw();
		}
	}

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)

		//set to state
		setP5(p5);
		p5.createCanvas(document.documentElement.clientWidth /2, document.documentElement.clientHeight).parent(canvasParentRef).parent('myContainer');
	};

	const draw = (p5) => {
		// The following was taken from the react-p5 docs:
		
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes

		// DRAWING ONE 
		// Other sketches removed for now to clean up code
		p5.push();

		var sc = 128 + p5.sin(p5.frameCount/50) * 128;
		var x = p5.width/2 + p5.cos(p5.frameCount/30) * 120;
		var y = p5.height/2 + p5.sin(p5.frameCount/30) * 120;

		p5.rect(0,0, p5.width, p5.height);
		p5.stroke(sc, 100);

		for (var i = 0; i < p5.width; i += 10) {
			p5.line(i, 0, x, y);
		}
		for (i = 0; i < p5.width; i += 10) {
			p5.line(i, p5.height, x, y);		
		}
		for (i = 0; i < p5.height; i += 10) {
			p5.line(0, i, x, y);		
		}
		for (i = 0; i <= p5.height; i += 10) {
			p5.line(p5.width, i, x, y);		
		}

		///////////////////////////////////////
		
		// DRAWING TWO
		
	};

	return (
		<div id="myContainer">
		<Container id="myContainer">
			<Sketch setup={setup} draw={draw} />
		</Container>
		</div>
	)
};

export default Pixi;