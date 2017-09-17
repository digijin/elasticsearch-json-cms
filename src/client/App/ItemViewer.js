// @flow

import React from "react";

import request from "browser-request";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";

import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

export default class ItemViewer extends React.Component {
	state: {
		loaded: boolean,
		id: string,
		type: string,
		child: { name: string },
		children: Array<any>,
		content: string,
		name: string,
		contentError: string,
		parent: string,
		version: number
	};
	props: { id: string, changeItem: Function };
	constructor() {
		super();
		this.state = this.baseState();
	}
	baseState() {
		return {
			loaded: false,
			id: "",
			type: "-",
			child: {
				name: ""
			},
			children: [],
			content: "",
			contentError: "",
			parent: "none",
			version: 1
		};
	}
	componentWillMount() {
		// console.log(this.props);
		this.state.id = this.props.id;
	}
	changeItem = (id: string) => {
		//hard set it
		this.state = Object.assign(this.baseState(), { id });
		this.setState({ loaded: false });
		this.loadSelf();
		this.loadChildren();
	};

	render() {
		return (
			<div className={this.state.loaded ? "loaded" : "loading"}>
				<FlatButton label="delete" onClick={this.delete} />
				<table>
					<tbody>
						<tr>
							<td>id</td>
							<td>{this.state.id}</td>
						</tr>
						<tr>
							<td>type</td>
							<td>{this.state.type}</td>
						</tr>
						<tr>
							<td>version</td>
							<td>{this.state.version}</td>
						</tr>
						<tr>
							<td>content</td>
							<td>
								<TextField
									value={this.state.content}
									onChange={this.contentChange}
									hintText="content"
									multiLine={true}
									floatingLabelText="Content"
									errorText={this.state.contentError}
								/>
								<br />
								<FlatButton
									label="Save"
									onClick={this.saveContent}
								/>
							</td>
						</tr>
						<tr>
							<td>parent</td>
							<td>
								{this.state.parent ? (
									<RaisedButton
										label={this.state.parent}
										onClick={() => {
											this.changeItem(this.state.parent);
										}}
									/>
								) : (
									"not found"
								)}
							</td>
						</tr>
						<tr>
							<td>children</td>
							<td>
								{this.state.children.map(c => {
									return (
										<RaisedButton
											key={c._id}
											label={c._source.name}
											onClick={() => {
												this.changeItem(c._id);
											}}
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
	contentChange = (e: Event) => {
		let content = e.target.value;
		let contentError = "";
		try {
			let json = JSON.parse(content);
		} catch (e) {
			contentError = "invalid json";
		}

		this.setState({ content: content, contentError: contentError });
	};
	addChild = () => {
		console.log(this.state.child.name);
		let child = {
			type: "child",
			id: this.state.id + ":" + this.state.child.name,
			body: this.state.child
		};
		child.body.parent = this.state.id;
		child.body.content = {};
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
	saveContent = () => {
		let json;
		try {
			json = JSON.parse(this.state.content);
		} catch (e) {
			// contentError = "invalid json";
			alert("won't save. invalid json.");
			return;
		}
		let data = {
			type: this.state.type,
			id: this.state.id,
			body: {
				parent: this.state.parent,
				name: this.state.name,
				content: json
			}
		};
		request(
			{
				method: "POST",
				url: "/api/index",
				body: JSON.stringify(data)
			},
			(err, res, body) => {
				console.log(body);
				// this.loadChildren();
			}
		);
	};
	delete = () => {
		if (confirm("are you sure you want to delete " + this.state.id + "?")) {
			request(
				"/api/delete?id=" + this.state.id + "&type=" + this.state.type,
				() => {}
			);
			this.changeItem("root");
		}
	};
	componentDidMount() {
		this.loadSelf();
		this.loadChildren();
	}
	loadSelf() {
		request("/api/get?id=" + this.state.id, (err, res) => {
			// console.log(err, res);
			let data = JSON.parse(res.body);
			console.log("self", data);
			this.setState({
				// raw: data,
				loaded: true,
				type: data._type,
				parent: data._source.parent,
				version: data._version,
				name: data._source.name,
				content: JSON.stringify(data._source.content, null, 2)
			});
		});
	}
	loadChildren() {
		request("/api/children?parent=" + this.state.id, (err, res) => {
			// console.log(err, res);
			let data = JSON.parse(res.body);
			this.setState({ children: data });
		});
	}
}
