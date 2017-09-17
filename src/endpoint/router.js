export default function router(server) {
	server.route({
		method: "GET",
		path: "/{path?}",
		handler: (req, reply) => {
			reply("hi" + req.params.path);
		}
	});
}
