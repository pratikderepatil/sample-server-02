const express = require("express");
const db = require("./db.json");
const fs = require("fs");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
	console.log(req.method, res.url);
	// res.write("Hello Pratik");
	// res.end();
	res.send("hello Pratik");
});

app.get("/posts", (req, res) => {
	console.log(req.method, res.url);
	// res.write("Hello Pratik");
	// res.end();
	res.send(db.posts);
});

app.get("/posts", (req, res) => {
	let { name } = req.query;
	let posts = db.posts;
	if (name) {
		posts = posts.filter((post) => post.name === name);
	}
	res.send(posts);
});

app.get("/posts/:id", (req, res) => {
	const id = req.params.id;
	const numId = Number(id);
	let post = db.posts.find((post) => post.id === numId);
	if (post) {
		res.send(post);
	} else {
		res.status(404).send(`Id not found ${id}`);
	}
});

app.post("/posts", (req, res) => {
	db.posts.push(req.body);
	fs.writeFile("./src/db.json", JSON.stringify(db), "utf-8", () => {
		// res.status(201).set("content-type", "application/text").send(db.posts);
		res.send(db.posts);
	});
});

app.post("/posts", (req, res) => {
	db.posts.push({ id: 3, message: "lmno" });
	fs.writeFile("./src/db.json", JSON.stringify(db), "utf-8", () => {
		// res.status(201).set("content-type", "application/text").send(db.posts);
		res.send(db.posts);
	});
});

app.delete("/posts:id", (req, res) => {
	const id = req.params.id;
	const numId = Number(id);
	let post = db.posts.filter((post) => post.id !== numId);
	db.posts = post;
	fs.writeFile("./src/db.json", JSON.stringify(db), "utf-8", () => {
		// res.status(201).set("content-type", "application/text").send(db.posts);
		res.send("delete");
	});
});

app.patch("/posts", (req, res) => {
	res.send("This is Patch Api");
});

app.listen(8080, () => {
	console.log("Listing on http://localhost:8080/");
});
