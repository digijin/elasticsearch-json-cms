import config from "../config";
import client from "../dbclient";

export default (req, reply) => {
	client
		.search(
			Object.assign({
				index: config.index,
				body: {
					query: {
						match: {
							parent: {
								query: req.query.parent
							}
						}
					}
				}
			})
		)
		.then(
			function(body) {
				// var hits = body.hits.hits;
				reply(body.hits.hits);
			},
			function(error) {
				reply(error);
			}
		);
};
