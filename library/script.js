const myLibrary = [];

function Book(title, author, pageCount, status) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
    this.statusString = status ? "read" : "unread";

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pageCount} pages`;
    }

}

function addBookToLibrary(book) {
    myLibrary.push(book);
}


const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const theIliad = new Book("The Iliad", "Homer", 509, false);
const ficciones = new Book("Ficciones", "Jorge Luis Borges", 171, true);
const theScarletLetter = new Book("The Scarlet Letter", "Nathaniel Hawthorne", 289, false);

addBookToLibrary(theHobbit);
addBookToLibrary(theIliad);
addBookToLibrary(ficciones);
addBookToLibrary(theScarletLetter);



function addRowToTable(book) {
    const container = document.querySelector(".container");
    const newRow = document.createElement("div");
    newRow.classList.add("row");

    const newBookData = document.createElement("div");
    newBookData.classList.add("entry", "data");
    newBookData.textContent = book.info();

    const newBookStatus = document.createElement("div");
    newBookStatus.classList.add("entry", "status");
    newBookStatus.textContent = book.statusString;

    const newDeleteButton = document.createElement("div");
    newDeleteButton.classList.add("entry", "delete");
    newDeleteButton.textContent = "bunton";

    newRow.appendChild(newBookData);
    newRow.appendChild(newBookStatus);
    newRow.appendChild(newDeleteButton);

    container.appendChild(newRow);
}

for (book of myLibrary) {
    addRowToTable(book);
}


// hook up buttons and dialog
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const confirmButton = document.querySelector("#confirmButton");

showButton.addEventListener('click', () => {
    dialog.show();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});


const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(form); //fires the formdata event
})

form.addEventListener("formdata", (e) => {
    console.log("formdata event fired");

    const data = e.formData;
    for (const entry of data.entries()) {
        console.log(entry);
        console.log(typeof entry);
      }

    console.log(data.get("book_title"));
    
    inputBook = new Book(data.get("book_title"), data.get("author"), data.get("page_count"), false);
    console.log(inputBook.info());
    addBookToLibrary(inputBook);
    addRowToTable(inputBook);
})