let myLibrary = [];

function Book(author, title, numOfPages, isRead) {
	this.author = author;
	this.title = title;
	this.numOfPages = numOfPages;
	this.isRead = isRead;
}

// localStorage.clear();
function addBookToLibrary(userInput) {
	let newBook = new Book(userInput.author, userInput.title, userInput.numOfPages, userInput.isRead);
	myLibrary.push(newBook);
	localStorage.setItem("BooksDetails", JSON.stringify(myLibrary));
}

let Books = document.getElementById("Books");
const newbook = document.getElementById("newbook");
newbook.addEventListener("click", addFormAfterButton);
let form = document.getElementById("newbookdetails");
form.style.display = "none";
let submit = document.getElementById("submit");
submit.addEventListener("click", submitFormDetails);
let wrongDetails = document.getElementById("wrongDetails");

//Get Books from Local Storage when reloaded/restarted
if (localStorage.getItem("BooksDetails") !== null) {
	myLibrary = JSON.parse(localStorage.getItem("BooksDetails"));
	displayBooks();
}
//Add Random Book
document.getElementById("addBook").addEventListener("click", (e) => {
	const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const randomAuthor = [...Array(10)].map((_) => c[~~(Math.random() * c.length)]).join("");
	const randomTitle =
		[...Array(5)].map((_) => c[~~(Math.random() * c.length)]).join("") +
		[...Array(6)].map((_) => c[~~(Math.random() * c.length)]).join("");
	const randomPages = ~~(Math.random() * 1000) + 1;
	const randomStatus = randomPages % 2 ? "true" : "false";
	const randomBook = {
		author: randomAuthor,
		title: randomTitle,
		numOfPages: randomPages,
		isRead: randomStatus,
	};
	addBookToLibrary(randomBook);
	while (Books.firstChild) Books.removeChild(Books.firstChild);
	displayBooks();
});
//Delete Random Book
document.getElementById("removeBook").addEventListener("click", (e) => {
	myLibrary.splice(~~(Math.random() * myLibrary.length), 1);
	while (Books.firstChild) Books.removeChild(Books.firstChild);
	displayBooks();
});

//Display All Books from Library(Inventory)
function displayBooks() {
	let itr = 0;
	for (let book of myLibrary) {
		let newBook = document.createElement("div");
		newBook.className += "item";
		newBook.setAttribute("data-item", itr);
		let readStatusButton = document.createElement("button");
		readStatusButton.className += "statusButton";
		readStatusButton.setAttribute("title", "Change Status");
		readStatusButton.innerHTML = `<span class="material-icons-outlined">
		visibility
		</span>`;
		newBook.appendChild(readStatusButton);

		let removeButton = document.createElement("button");
		removeButton.className += "removeThisBook";
		removeButton.setAttribute("title", "Remove Book");
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
		newp.appendChild(
			document.createTextNode(`${book.isRead}` == "true" ? "Already Read!" : "Still didnt Read this")
		);
		newBook.appendChild(newp);
		if (`${book.isRead}` == "true") {
			newBook.style.filter = "blur(0.06em)";
		}
		Books.appendChild(newBook);
		itr++;
	}
	let removeButtons = [...document.querySelectorAll(".removeThisBook")];
	removeButtons.forEach((removeButton) => removeButton.addEventListener("click", removeBook));
	let statusButtons = document.querySelectorAll(".statusButton");
	statusButtons.forEach((statusButton) => statusButton.addEventListener("click", toggleReadStatus));
}

//Display Form
function addFormAfterButton(e) {
	e.target.style.transition = "all .5s linear";
	if (form.style.display === "none") {
		e.target.style.backgroundColor = "black";
		e.target.style.color = "white";
		form.style.display = "flex";
		form.style.flexDirection = "column";
		form.style.alignContent = "center";
		form.style.justifyContent = "space-around";
		form.style.flexWrap = "wrap";
		form.style.fontSize = "20px";
	} else {
		e.target.style.backgroundColor = "turquoise";
		e.target.style.color = "black";
		form.style.display = "none";
	}
}

//Return whether Details entered in the Form are Valid
function isValid(book) {
	if (book.author === "" || book.title === "" || book.numOfPages == NaN) {
		wrongDetails.style.display = "block";
		return false;
	}
	return true;
}

//Submit Details Entered in the Form to enter a new book to the library
function submitFormDetails(e) {
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
	form.reset();
	form.style.display = "none";
	newbook.style.color = "black";
	newbook.style.backgroundColor = "turquoise";
}

//Remove corresponding Book and Update Library
function removeBook(e) {
	let bookIndex;
	if (e.target.parentNode.getAttribute("data-item") === null) {
		bookIndex = e.target.parentNode.parentNode.getAttribute("data-item");
	} else bookIndex = e.target.parentNode.getAttribute("data-item");
	myLibrary.splice(bookIndex, 1);
	while (Books.firstChild) Books.removeChild(Books.firstChild);
	displayBooks();
	localStorage.setItem("BooksDetails", JSON.stringify(myLibrary));
}

//Change the status of corresponding book
function toggleReadStatus(e) {
	let readstatus;
	let curBook;
	if (e.target.parentNode.getAttribute("data-item") === null) {
		curBook = e.target.parentNode.parentNode;
	} else {
		curBook = e.target.parentNode;
	}
	readstatus = myLibrary[curBook.getAttribute("data-item")].isRead;
	if (readstatus === "false") {
		myLibrary[curBook.getAttribute("data-item")].isRead = "true";
		// curBook.style.filter = "blur(0.06em)";
	} else {
		myLibrary[curBook.getAttribute("data-item")].isRead = "false";
		// curBook.style.filter = "blur(0em)";
	}
	console.log(myLibrary[curBook.getAttribute("data-item")]);
	while (Books.firstChild) Books.removeChild(Books.firstChild);
	displayBooks();
}
