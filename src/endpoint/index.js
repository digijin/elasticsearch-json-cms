const Koa = require("koa");
const app = new Koa();
import config from "../config";
import client from "../dbclient.js";

// response
app.use(async (ctx, next) => {
	let path = ctx.path.split("/");
	path[0] = "root";
	path = path.join(":");
	let result = await client.get({
		index: config.index,
		type: "_all",
		id: path
	});
	ctx.body = result;
	next();
});

app.listen(7000);
console.log("endpoint on", 7000);
