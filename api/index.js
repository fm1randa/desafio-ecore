const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const list = [
	{ id: 1, name: "Filipe", age: 20, group: defineGroup(20) },
	{ id: 2, name: "Tiago", age: 11, group: defineGroup(11) },
];

let sequence = 3;

function defineGroup(age) {
	if (age >= 0 && age < 12) {
		return "kid";
	}
	if (age >= 12 && age <= 19) {
		return "teen";
	}
	if (age >= 20 && age < 65) {
		return "adult";
	}
	if (age >= 65) {
		return "elder";
	}
}

app.get("/", (req, res) => res.send("API is running!"));

app.get("/list", (req, res) => res.status(200).json(list));

app.post("/list", (req, res) => {
	try {
		const person = req.body;
		list.push({ id: sequence, ...person, group: defineGroup(person.age) });
		sequence += 1;
		res.status(200).send(list);
	} catch (err) {
		res.status(500).send(`Error during person insertion: ${err}`);
	}
});

app.listen(3000, () => {
	console.log(`API is running @ localhost:${port}!`);
});
