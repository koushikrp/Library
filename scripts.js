let myLibrary = [];

function Book(author, title, numOfPages, isRead) {
	this.author = author;
	this.title = title;
	this.numOfPages = numOfPages;
	this.isRead = isRead;
}

function addBookToLibrary(userInput) {
	let newBook = new Book(userInput.author, userInput.title, userInput.numOfPages, userInput.isRead);
	myLibrary.push(newBook);
}
let Books = document.getElementById("Books");
function displayBooks() {
	let itr = 0;
	for (let book of myLibrary) {
		let newBook = document.createElement("div");
		newBook.className += "item";
		newBook.setAttribute("data-item", itr);
		let removeButton = document.createElement("button");
		removeButton.className += "removeThisBook";
		removeButton.innerHTML = `<span class="material-icons-outlined">
		remove_circle_outline
		</span>`;
		newBook.appendChild(removeButton);
		let newp = document.createElement("p");
		let title = document.createElement("h2");
		title.textContent = book.title;
		newp.appendChild(title);
		newp.appendChild(document.createTextNode(`Author: ${book.author}`));
		newp.appendChild(document.createElement("br"));
		newp.appendChild(document.createTextNode(`Number of Pages: ${book.numOfPages}`));
		newp.appendChild(document.createElement("br"));
		newp.appendChild(document.createTextNode(`IsRead: ${book.isRead}`));
		newBook.appendChild(newp);
		Books.appendChild(newBook);
		itr++;
		console.log(newBook);
	}
}

let book1 = {
	author: "koushik",
	title: "how to work hard",
	numOfPages: 2,
	isRead: false,
};
let book2 = {
	author: "kosdvd",
	title: "how to rkasdsa sadac",
	numOfPages: 47,
	isRead: false,
};
let book3 = {
	author: "sdvosdvd",
	title: "qwefq to qwrkasdsa qwradac",
	numOfPages: 35,
	isRead: true,
};
let book4 = {
	author: "asgdvd",
	title: "ahdfw ahgdsfddsa sadac",
	numOfPages: 347,
	isRead: false,
};
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
displayBooks();

function addFormAfterButton(e) {
	let form = document.getElementById("newbookdetails");
	if (form.style.display === "none") {
		e.target.style.backgroundColor = "black";
		e.target.style.color = "white";
		form.style.display = "flex";
		form.style.flexDirection = "column";
		form.style.alignContent = "center";
		form.style.justifyContent = "space-around";
		form.style.fontSize = "20px";
	} else {
		e.target.style.backgroundColor = "turquoise";
		form.style.display = "none";
	}
}
function isValid(book) {
	if (book.author === "" || book.title === "" || book.numOfPages == NaN) {
		wrongDetails.style.display = "block";
		return false;
	}
	return true;
}
function submitFormDetails(e) {
	let formDetails = document.getElementById("newbookdetails");
	let enteredAuthor = document.getElementById("Author").value;
	let enteredTitle = document.getElementById("Title").value;
	let enteredPages = document.getElementById("pages").value;
	let enteredReadStatus = document.getElementById("read");
	let isread;
	if (enteredReadStatus.checked) isread = "true";
	else isread = "false";
	let newBook = {
		author: enteredAuthor,
		title: enteredTitle,
		numOfPages: parseInt(enteredPages),
		isRead: isread,
	};
	if (!isValid(newBook)) return;
	wrongDetails.style.display = "none";
	addBookToLibrary(newBook);
	while (Books.firstChild) Books.removeChild(Books.firstChild);
	displayBooks();
	document.getElementById("newbookdetails").reset();
	document.getElementById("newbookdetails").style.display = "none";
}

function removeBook(e) {
	console.log("hi");
	let bookIndex;
	if (e.target.parentNode.getAttribute("data-item") === null) {
		bookIndex = e.target.parentNode.parentNode.getAttribute("data-item");
	} else bookIndex = e.target.parentNode.getAttribute("data-item");
	console.log(bookIndex);
	myLibrary.splice(bookIndex, 1);
	while (Books.firstChild) Books.removeChild(Books.firstChild);
	displayBooks();
}
const newbook = document.querySelector("#newbook");
newbook.addEventListener("click", addFormAfterButton);
let submit = document.getElementById("submit");
submit.addEventListener("click", submitFormDetails);
let wrongDetails = document.getElementById("wrongDetails");
let removeButtons = [...document.querySelectorAll(".removeThisBook")];
removeButtons.forEach((removeButton) => removeButton.addEventListener("click", removeBook));
