var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
	host: "localhost:9200",
	// log: "trace",
	httpAuth: "elastic:changeme"
});

import hapi from "hapi";
const server = client.ping(
	{
		// ping usually has a 3000ms timeout
		requestTimeout: 1000
	},
	function(error) {
		if (error) {
			console.trace("elasticsearch cluster is down!");
		} else {
			console.log("All is well");
		}
	}
);

// client.create(
// 	{
// 		index: "myindex2",
// 		type: "mytype",
// 		id: "1",
// 		body: {
// 			title: "Test pants",
// 			tags: ["y", "z"],
// 			published: true,
// 			published_at: "2013-01-01",
// 			counter: 1
// 		}
// 	},
// 	function(error, response) {}
// );

// client
// 	.search({
// 		q: "pants"
// 	})
// 	.then(
// 		function(body) {
// 			var hits = body.hits.hits;
// 		},
// 		function(error) {
// 			console.trace(error.message);
// 		}
// 	);
