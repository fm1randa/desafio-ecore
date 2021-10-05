const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const list = [
	{ id: 1, name: "Filipe Miranda", age: 20 },
	{ id: 2, name: "Tiago Miranda", age: 11 },
];

let sequence = 3;

app.get("/", (req, res) => res.send("API is running!"));

app.get("/list", (req, res) => res.status(200).json(list));

app.listen(3000, () => {
	console.log(`api is running @ localhost:${port}`);
});
