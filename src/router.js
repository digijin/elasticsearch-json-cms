import ping from "./route/ping";
import health from "./route/health";
import create from "./route/create";
import search from "./route/search";
import index from "./route/index";
import get from "./route/get";
import children from "./route/children";
import del from "./route/delete";
import prepopulate from "./route/prepopulate";

export default server => {
	server.route({
		method: "GET",
		path: "/api/prepopulate",
		handler: prepopulate
	});
	server.route({
		method: "GET",
		path: "/api/ping",
		handler: ping
	});
	server.route({
		method: "GET",
		path: "/api/health",
		handler: health
	});
	server.route({
		method: "GET",
		path: "/api/create",
		handler: create
	});
	server.route({
		method: "GET",
		path: "/api/search",
		handler: search
	});
	server.route({
		method: ["PUT", "POST", "GET"],
		path: "/api/index",
		handler: index
	});
	server.route({
		method: "GET",
		path: "/api/get",
		handler: get
	});
	server.route({
		method: "GET",
		path: "/api/children",
		handler: children
	});
	server.route({
		method: "GET",
		path: "/api/delete",
		handler: del
	});
};
