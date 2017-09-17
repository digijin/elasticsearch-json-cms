import React from "react";
import ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Container from "App/Container";

export default class App {
	constructor(container) {
		this.container = container;
		// container.innerHTML = "asd";
		this.state = { id: "root" };

		this.render();
	}
	render() {
		ReactDOM.render(
			<div>
				<MuiThemeProvider>
					<Container />
				</MuiThemeProvider>
			</div>,
			this.container
		);
	}
	// changeItem = (id: string) => {
	// 	// this.setState({ id });
	// 	this.state = { id };
	// 	this.render();
	// };
}
