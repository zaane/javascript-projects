const myLibrary = [];

function Book(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
    this.haveReadString = haveRead ? "has been read" : "has not been read";

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.haveReadString}`;
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
    newBookStatus.textContent = "ireadit"

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