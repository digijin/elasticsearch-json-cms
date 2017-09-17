// @flow

import React from "react";

import request from "browser-request";

export default class ItemViewer extends React.Component {
	componentDidMount() {
		request("/api/search?id=" + this.props.id, (err, res) => {
			console.log(err, res);
		});
	}
	render() {
		return <div>fetch {this.props.id}</div>;
	}
}
