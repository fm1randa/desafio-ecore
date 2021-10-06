const api = axios.create({
	baseURL: "http://localhost:3000",
});
const kidList = document.querySelector("#kid");
const teenList = document.querySelector("#teen");
const adultList = document.querySelector("#adult");
const elderList = document.querySelector("#elder");
const insertButton = document.querySelector("#insert");
const orderSelect = document.querySelector("#select");

let inserted = [];

function clearLists() {
	kidList.innerHTML = "";
	teenList.innerHTML = "";
	adultList.innerHTML = "";
	elderList.innerHTML = "";
}

function appendToList(person, remount) {
	if (
		remount ||
		!inserted.find((insertedPerson) => insertedPerson.id === person.id)
	) {
		const listItem = document.createElement("li");
		listItem.textContent = `${person.name} - ${person.age} anos`;
		if (person.group === "kid") {
			kidList.appendChild(listItem);
		}
		if (person.group === "teen") {
			teenList.appendChild(listItem);
		}
		if (person.group === "adult") {
			adultList.appendChild(listItem);
		}
		if (person.group === "elder") {
			elderList.appendChild(listItem);
		}
	}
}

async function loadHandler() {
	const { data: list } = await api.get("/list");

	list.map((person) => {
		appendToList(person);
	});

	inserted = list;
	orderHandler();
}

function nameNormalize(name) {
	const nameArray = name.split(" ");
	const normalizedName = nameArray.reduce((prev, curr) => {
		return prev + curr.charAt(0).toUpperCase() + curr.slice(1) + " ";
	}, "");
	return normalizedName;
}

async function insertHandler() {
	try {
		const name = nameNormalize(document.querySelector("#name").value);
		const age = Number(document.querySelector("#age").value);

		const { data: list } = await api.post("/list", { name, age });

		list.map((person) => {
			appendToList(person);
		});

		inserted = list;
		clearLists();
		orderHandler();
	} catch (err) {
		alert("Ocorreu um erro ao inserir: " + err);
	}
}

function orderHandler() {
	const orderBy = orderSelect.value;
	const prop = orderBy.split(" ")[0];
	const DESC = orderBy.split(" ")[1] === "DESC";
	if (prop === "Nome") {
		inserted = inserted.sort((a, b) => {
			if (DESC) {
				if (a.name < b.name) {
					return 1;
				}
				return -1;
			} else {
				if (a.name > b.name) {
					return 1;
				}
				return -1;
			}
		});
	} else {
		inserted = inserted.sort((a, b) => {
			if (DESC) {
				if (a.age < b.age) {
					return 1;
				}
				return -1;
			} else {
				if (a.age > b.age) {
					return 1;
				}
				return -1;
			}
		});
	}
	clearLists();
	inserted.map((person) => appendToList(person, true));
}

insertButton.onclick = insertHandler;
orderSelect.onchange = orderHandler;
loadHandler();
