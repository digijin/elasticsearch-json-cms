import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	client
		.get(
			Object.assign(
				{
					index: config.index,
					type: "_all",
					id: "/"
				},
				req.query
			)
		)
		.then(
			function(body) {
				// var hits = body.hits.hits;
				reply(body);
			},
			function(error) {
				reply(error);
			}
		);
};
