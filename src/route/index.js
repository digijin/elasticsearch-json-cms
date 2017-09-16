import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	reply(req.payload);

	// client.index(
	// 	{
	// 		index: config.index,
	// 		type: "root",
	// 		id: "/",
	// 		body: {
	// 			path: "/"
	// 		}
	// 	},
	// 	function(error, response) {
	// 		if (error) {
	// 			reply(error);
	// 		} else {
	// 			reply(response);
	// 		}
	// 	}
	// );
};
