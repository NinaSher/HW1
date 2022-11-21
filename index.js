const container = document.querySelector("main");
const popupBlock = document.querySelector(".popup-wrapper");



popupBlock.querySelector(".popup__close").addEventListener("click", function () {
	popupBlock.classList.remove("active");
});

document.querySelector("#add").addEventListener("click", function (e) {
	e.preventDefault();
	popupBlock.classList.add("active");
});

const addForm = document.forms.addForm;

const createCard = function (cat, parent) {
	const card = document.createElement("div");
	card.className = "card";

	const img = document.createElement("div");
	img.className = "card-pic";
	if (cat.img_link) {
		img.style.backgroundImage = `url(${cat.img_link})`;
	} else {
		img.style.backgroundImage = "url(img/cat.png)";
		img.style.backgroundSize = "contain";
		img.style.backgroundColor = "transparent";
	}
	const name = document.createElement("h3");
	name.innerText = cat.name;

	const del = document.createElement("button");
	del.innerText = "delete";
	del.id = cat.id;
	del.addEventListener("click", function (e) {
		let id = e.target.id;
		deleteCat(id, card);
	});

	card.append(img, name, del);
	parent.append(card);
}

createCard({ name: "Багира", img_link: "" }, container);
createCard({name: "Багира", img_link: "https://www.friendforpet.ru/api/sites/default/files/2022-01/%D0%BB%D0%B5%D0%B2%D0%B83_%D0%B0%D0%BB%D0%B5%D0%BA%D1%81.jpg"}, container);

fetch(`http://sb-cats.herokuapp.com/api/2/NinaSher/show`)
	.then(res => res.json())
	.then(result => {
		if (result.message === "ok") {
			console.log(result.data);
			result.data.forEach(function (el) {
				createCard(el, container);
			});
		}
	})



const addCat = function (cat) {
	fetch(`http://sb-cats.herokuapp.com/api/2/NinaSher/add`, {
		method: "POST",
		headrs: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(cat)
	})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if (data.message === "ok") {
				createCard(cat, container);
				addForm.reset()
				popupBlock.classList.remove("active");
			}
		})
}

const deleteCat = async function (id, tag) {
	let res = await fetch(`http://sb-cats.herokuapp.com/api/2/NinaSher/delete/${id}`, {
		method: "DELETE"
	});
	let data = await res.json();

	if (data.message === "ok") {
		tag.remove();
	}
}

addForm.addEventListener("submit", function (e) {
	e.preventDefault();
	let body = {};

	for (let i = 0; i < addForm.elements.length; i++) {
		let el = addForm.elements[i];
		console.log(el);
		if (el.name) {
			body[el.name] = el.name === "favourite" ? el.checked : el.value;
		}
	}

	console.log(body);
	addCat(body);
});


