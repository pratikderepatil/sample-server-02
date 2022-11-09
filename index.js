const express = require("express");
const app = express();
const userRoute = require("./post/post.router");

app.use(express.json());
app.get("/", (req, res) => {
	console.log(req.method, res.url);
	// res.write("Hello Pratik");
	// res.end();
	res.send("hello Pratik");
});
app.use("/post", userRoute);

app.listen(8080, () => {
	console.log("Listing on http://localhost:8080/");
});
