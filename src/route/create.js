import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	client.create(
		{
			index: config.index,
			type: "rootnode",
			id: "root",
			body: {
				path: "root",
				contents: { testing: "some data here" }
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
