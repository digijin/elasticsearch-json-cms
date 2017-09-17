import React from "react";
import ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import SideNav from "App/SideNav";
import ItemViewer from "App/ItemViewer";

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
					<div>
						<SideNav />
						<ItemViewer
							// changeItem={this.changeItem}
							id={this.state.id}
						/>
					</div>
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
