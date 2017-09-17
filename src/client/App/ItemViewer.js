// @flow

import React from "react";

import request from "browser-request";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";

import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

export default class ItemViewer extends React.Component {
	state: {
		type: string,
		child: { name: string },
		children: Array<any>,
		source: string
	};
	props: { id: string };
	constructor() {
		super();
		this.state = {
			type: "-",
			child: {
				name: ""
			},
			children: [],
			source: ""
		};
	}
	componentWillMount() {}
	render() {
		return (
			<div>
				<table>
					<tbody>
						<tr>
							<td>id</td>
							<td>{this.props.id}</td>
						</tr>
						<tr>
							<td>type</td>
							<td>{this.state.type}</td>
						</tr>
						<tr>
							<td>source</td>
							<td>{this.state.source}</td>
						</tr>
						<tr>
							<td>children</td>
							<td>
								{this.state.children.map(c => {
									return (
										<RaisedButton
											key={c._id}
											label={c._source.name}
										/>
									);
								})}
							</td>
						</tr>
					</tbody>
				</table>
				<Paper>
					<div style={{ padding: "30px" }}>
						<h4>Add Child</h4>
						<TextField
							value={this.state.child.name}
							onChange={this.fieldChange}
							hintText="name"
						/>
						<br />
						<FlatButton label="Save" onClick={this.addChild} />
					</div>
				</Paper>
			</div>
		);
	}
	fieldChange = (e: Event) => {
		this.setState({ child: { name: e.target.value } });
	};
	addChild = () => {
		console.log(this.state.child.name);
		let child = {
			type: "child",
			id: this.props.id + ":" + this.state.child.name,
			body: this.state.child
		};
		child.body.parent = this.props.id;
		request(
			{
				method: "POST",
				url: "/api/index",
				body: JSON.stringify(child)
			},
			(err, res, body) => {
				console.log(body);
				this.loadChildren();
			}
		);
	};
	componentDidMount() {
		this.loadSelf();
		this.loadChildren();
	}
	loadSelf() {
		request("/api/get?id=" + this.props.id, (err, res) => {
			// console.log(err, res);
			let data = JSON.parse(res.body);
			// console.log(data);
			this.setState({
				// raw: data,
				type: data._type,
				source: JSON.stringify(data._source, null, 2)
			});
		});
	}
	loadChildren() {
		request("/api/children?parent=" + this.props.id, (err, res) => {
			// console.log(err, res);
			let data = JSON.parse(res.body);
			this.setState({ children: data });
		});
	}
}
