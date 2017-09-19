// @flow

import React from "react";

import request from "browser-request";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Subheader from "material-ui/Subheader";

import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

const DIVIDER = ":";

let styles = {
	card: {
		card: {
			marginBottom: 10
		},
		header: {
			backgroundColor: "#81d4fa",
			padding: "8px 10px"
		},
		text: {
			paddingTop: 0,
			paddingBottom: 10
		}
	}
};

import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from "material-ui/Card";

export default class ItemViewer extends React.Component {
	state: {
		loaded: boolean,
		id: string,
		type: string,
		child: { name: string, type: string, content: string },
		children: Array<any>,
		content: string,
		name: string,
		contentError: string,
		parent?: string,
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
				name: "",
				type: "child",
				content: "{}"
			},
			children: [],
			content: "",
			contentError: "",
			// parent: "none",
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
				<Card style={styles.card.card} initiallyExpanded={true}>
					<CardHeader
						title="Relationships"
						subtitle="links to parents and children"
						actAsExpander={true}
						showExpandableButton={true}
						style={styles.card.header}
					/>
					<CardText expandable={true} style={styles.card.text}>
						<Subheader>Path</Subheader>
						{this.state.id.split(DIVIDER).map((c, i, a) => {
							let path = a.slice(0, i).join(DIVIDER);
							if (path.length > 0) {
								path += DIVIDER;
							}
							path += c;
							// console.log(c, i, a, path);

							return (
								<RaisedButton
									label={c}
									disabled={i == a.length - 1}
									onClick={() => {
										this.changeItem(path);
									}}
								/>
							);
						})}

						<Subheader>Children</Subheader>
						<div style={{ minHeight: 36 }}>
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
						</div>
					</CardText>
				</Card>
				<Card style={styles.card.card} initiallyExpanded={true}>
					<CardHeader
						title="Content"
						subtitle="editable"
						actAsExpander={true}
						showExpandableButton={true}
						style={styles.card.header}
					/>
					<CardText expandable={true} style={styles.card.text}>
						<TextField
							value={this.state.version}
							disabled={true}
							floatingLabelText="Version"
						/>
						<br />
						<TextField
							value={this.state.content}
							onChange={this.contentChange}
							hintText="content"
							multiLine={true}
							floatingLabelText="Content"
							errorText={this.state.contentError}
						/>

						<br />
						<FlatButton label="Save" onClick={this.saveContent} />

						<FlatButton label="delete" onClick={this.delete} />
					</CardText>
				</Card>

				<Card style={styles.card.card}>
					<CardHeader
						title="Add Child"
						subtitle="add children to current node"
						actAsExpander={true}
						showExpandableButton={true}
						style={styles.card.header}
					/>
					<CardText expandable={true}>
						<TextField
							value={this.state.child.name}
							onChange={this.fieldChange}
							name={"name"}
							floatingLabelText="name"
						/>
						<TextField
							value={this.state.child.type}
							onChange={this.fieldChange}
							name={"type"}
							floatingLabelText="type"
						/>
						<TextField
							value={this.state.child.content}
							onChange={this.fieldChange}
							name={"content"}
							floatingLabelText="content"
						/>
						<br />
						<FlatButton label="Save" onClick={this.addChild} />
					</CardText>
				</Card>
			</div>
		);
	}
	fieldChange = (e: Event) => {
		let newState = {};
		newState[e.target.name] = e.target.value;
		this.setState({ child: newState });
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
		// console.log(this.state.child.name);
		let child = {
			type: "child",
			id: this.state.id + DIVIDER + this.state.child.name,
			body: Object.assign({}, this.state.child)
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
			// console.log("self", data);
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
