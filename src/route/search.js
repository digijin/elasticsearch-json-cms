import config from "../config";
import client from "../client";

export default (req, reply) => {
	client
		.search({
			q: "pants"
		})
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
