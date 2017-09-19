import config from "../config";
import client from "../dbclient";

export default async (req, reply) => {
	let output = "prepop";
	await client.index({
		index: config.index,
		type: "rootnode",
		id: "root",
		body: {
			path: "root",
			content: { testing: "some data here" }
		}
	});
	for (let i = 0; i < data.length; i++) {
		// console.log(data[i]);
		await client.index(data[i]);
	}

	reply(data);
};

let base = () => {
	return {
		index: config.index,
		type: "child",
		id: "root",
		body: {
			content: { title: "My Title", content: "some content here" }
		}
	};
};

let data = [
	{ id: "root:site", body: { content: { title: "hi" } } },
	{ id: "root:site:settings" },
	{ id: "root:site:settings:metatags" },
	{ id: "root:site:settings:facebook" },
	{ id: "root:site:settings:instagram" },
	{ id: "root:site:settings:twitter" },
	{ id: "root:site:category" },
	{ id: "root:site:category:news" },
	{ id: "root:site:category:blog" },
	{ id: "root:site:category:blog:1" },
	{ id: "root:site:category:blog:2" },
	{ id: "root:site:category:blog:3" },
	{ id: "root:site:category:blog:4" },
	{ id: "root:site:category:blog:5" },
	{ id: "root:site:category:blog:6" },
	{ id: "root:site:category:articles" },
	{ id: "root:site:category:articles:2017" },
	{ id: "root:site:category:articles:2017:sep" },
	{ id: "root:site:category:articles:2017:sep:19" },
	{ id: "root:site:category:articles:2017:sep:19:story1" },
	{ id: "root:site:category:articles:2017:sep:19:story2" },
	{ id: "root:site:category:articles:2017:sep:19:story3" },
	{ id: "root:site:category:articles:2017:sep:19:story4" },
	{ id: "root:site:category:articles:2017:sep:20" },
	{ id: "root:site:category:articles:2017:sep:20:story1" },
	{ id: "root:site:category:articles:2017:sep:20:story2" },
	{ id: "root:site:category:articles:2017:sep:20:story3" },
	{ id: "root:site:category:articles:2017:sep:20:story4" },
	{ id: "root:site:category:articles:2017:sep:20:story5" },
	{ id: "root:site:category:articles:2017:sep:21" },
	{ id: "root:site:category:articles:2017:sep:21:story1" },
	{ id: "root:site:category:articles:2017:sep:21:story2" },
	{ id: "root:site:category:articles:2017:sep:21:story3" },
	{ id: "root:site:category:articles:2017:sep:21:story4" },
	{ id: "root:site:category:articles:2017:sep:21:story5" },
	{ id: "root:site:category:articles:2017:sep:21:story6" },
	{ id: "root:site:category:videos" },
	{ id: "root:site:category:videos:dogs" },
	{ id: "root:site:category:videos:cats" },
	{ id: "root:site:category:videos:dogs-and-cats" }
].map(d => {
	// WARNING  need deep merge

	let obj = Object.assign(base(), d);
	// console.log("obj", obj);

	let parts = obj.id.split(":");
	// console.log("parts", parts);
	obj.body.name = parts.pop();
	// console.log("pop", parts);
	obj.body.parent = parts.join(":");
	// console.log("final", obj);
	return obj;
});
