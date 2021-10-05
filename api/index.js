const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get("/", (req, res) => res.send("API is running!"));

app.listen(3000, () => {
	console.log(`api is running @ localhost:${port}`);
});
