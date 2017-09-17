import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	// reply(req.payload);
	let payload = Object.assign(
		{
			index: config.index,
			type: "root",
			id: "/",
			body: {
				path: "/"
			}
		},
		JSON.parse(req.payload)
	);
	// reply(payload);

	client.index(payload, function(error, response) {
		if (error) {
			reply(error);
		} else {
			reply(response);
		}
	});
};
