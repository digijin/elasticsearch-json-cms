import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	client
		.search(
			Object.assign(
				{
					index: config.index,
					body: {
						query: {
							match: {
								parent: {
									query: "root:foxsports:category:news"
								}
								// tag: {
								// 	query: "soccer"
								// }
							}
						}
					}
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
