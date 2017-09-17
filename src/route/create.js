import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	client.create(
		{
			index: config.index,
			type: "root",
			id: "/",
			body: {
				path: "/"
			}
		},
		function(error, response) {
			if (error) {
				reply(error);
			} else {
				reply(response);
			}
		}
	);
};
