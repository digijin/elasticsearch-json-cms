import client from "../dbclient";

export default (req, reply) => {
	client.ping(
		{
			// ping usually has a 3000ms timeout
			requestTimeout: 1000
		},
		function(error) {
			if (error) {
				reply({ response: "DOWN" });
			} else {
				reply({ response: "OK" });
			}
		}
	);
};
