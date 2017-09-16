var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
	host: "localhost:9200",
	// log: "trace",
	httpAuth: "elastic:changeme"
});

export default client;
