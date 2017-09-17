import Hapi from "hapi";

import router from "./router";

const server = new Hapi.Server();
server.connection({
	host: "localhost",
	port: "8000"
});
// server.register([require("hapi-async-handler")], function(error) {
// 	console.log(error);
// });

router(server);

server.start(err => {
	if (err) {
		throw err;
	}
	console.log("Server running at:", server.info.uri);
});
