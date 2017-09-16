import config from "../config";
import client from "../client";

export default (req, reply) => {
	client.create(
		{
			index: config.index,
			type: "mytype",
			id: "1",
			body: {
				title: "Test pants",
				tags: ["y", "z"],
				published: true,
				published_at: "2013-01-01",
				counter: 1
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