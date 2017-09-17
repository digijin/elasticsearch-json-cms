import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	// reply(req.payload);
	let payload = JSON.parse(req.payload);

	client.index(
		Object.assign(
			{
				index: config.index,
				type: "root",
				id: "/",
				body: {
					path: "/"
				}
			},
			payload
		),
		function(error, response) {
			if (error) {
				reply(error);
			} else {
				reply(response);
			}
		}
	);
};
