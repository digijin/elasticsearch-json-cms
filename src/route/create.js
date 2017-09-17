import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	client.create(
		{
			index: config.index,
			type: "test",
			id: "root",
			body: {
				path: "root"
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
