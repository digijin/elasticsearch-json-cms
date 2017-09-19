import React from "react";
import SideNav from "App/SideNav";
import ItemViewer from "App/ItemViewer";

export default class Container extends React.Component {
	constructor() {
		super();
		this.state = { id: "root" };
	}
	render() {
		// <SideNav />
		return (
			<div>
				<ItemViewer
					// changeItem={this.changeItem}
					id={this.state.id}
				/>
			</div>
		);
	}
	// changeItem = (id: string) => {
	// 	// this.setState({ id });
	// 	this.state = { id };
	// 	this.render();
	// };
}
