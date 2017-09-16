import ping from "./route/ping";
import health from "./route/health";
import create from "./route/create";
import search from "./route/search";

export default server => {
	server.route({
		method: "GET",
		path: "/ping",
		handler: ping
	});
	server.route({
		method: "GET",
		path: "/health",
		handler: health
	});
	server.route({
		method: "GET",
		path: "/create",
		handler: create
	});
	server.route({
		method: "GET",
		path: "/search",
		handler: search
	});
};
