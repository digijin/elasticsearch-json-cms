import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	client
		.search(
			Object.assign(
				{
					index: config.index
					// q: "pants"
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
