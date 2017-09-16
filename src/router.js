import ping from "./route/ping";
import health from "./route/health";
import create from "./route/create";
import search from "./route/search";
import index from "./route/index";

export default server => {
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
		method: "POST",
		path: "/api/index",
		handler: index
	});
};
