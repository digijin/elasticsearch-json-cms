import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	client.delete(
		{
			index: config.index,
			type: req.query.type,
			id: req.query.id
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
