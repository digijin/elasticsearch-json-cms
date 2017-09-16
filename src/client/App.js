import React from "react";
import ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Paper from "material-ui/Paper";

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from "material-ui/Table";

export default class App {
	constructor(container) {
		this.container = container;
		// container.innerHTML = "asd";
		this.render();
	}
	render() {
		ReactDOM.render(
			<div>
				<MuiThemeProvider>
					<Paper>
						Here is some data
						<Table>
							<TableHeader>
								<TableRow>
									<TableHeaderColumn>ID</TableHeaderColumn>
									<TableHeaderColumn>Name</TableHeaderColumn>
									<TableHeaderColumn>
										Status
									</TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableRowColumn>1</TableRowColumn>
									<TableRowColumn>John Smith</TableRowColumn>
									<TableRowColumn>Employed</TableRowColumn>
								</TableRow>
							</TableBody>
						</Table>
					</Paper>
				</MuiThemeProvider>
			</div>,
			this.container
		);
	}
}
