const myLibrary = [];

function Book(title, author, pageCount, status) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
    
    this.toggleStatus = function() {
        this.status = !this.status;
    }
    
    this.statusString = function() {
        return this.status ? "read" : "unread";
    };

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.statusString()}`;
    };

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

function makeBookInfoDiv(book) {
    const bookTitleSpan = document.createElement("span");
    bookTitleSpan.classList.add("book-title");
    bookTitleSpan.textContent = book.title;
    
    const bookAuthorSpan = document.createElement("span");
    bookAuthorSpan.classList.add("author");
    bookAuthorSpan.textContent = `by ${book.author}`;
    
    const pageCountSpan = document.createElement("span");
    pageCountSpan.classList.add("page-count");
    pageCountSpan.textContent = `${book.pageCount} pages`;

    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.classList.add("entry", "data");

    bookInfoDiv.appendChild(bookTitleSpan);
    bookInfoDiv.appendChild(bookAuthorSpan);
    bookInfoDiv.appendChild(pageCountSpan);

    return bookInfoDiv;
}

function addRowToTable(book, index) {
    
    const container = document.querySelector(".container");
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.dataset.index = index;

    const newBookData = makeBookInfoDiv(book);

    const newBookStatus = document.createElement("div");
    newBookStatus.classList.add("entry", "status");
    newBookStatus.textContent = (book.status === true) ? "📖" : "📘";
    newBookStatus.addEventListener('click', () => {
        toggleStatus(index);
    });

    const newDeleteButton = document.createElement("button");
    const trashCanSpan = document.createElement("span");
    trashCanSpan.classList.add("material-symbols-outlined")
    trashCanSpan.textContent = "delete";

    newDeleteButton.classList.add("delete");
    newDeleteButton.appendChild(trashCanSpan);
    newDeleteButton.addEventListener('click', () => {
        deleteRow(index);
    });

    newRow.appendChild(newBookData);
    newRow.appendChild(newBookStatus);
    newRow.appendChild(newDeleteButton);

    container.appendChild(newRow);
};

myLibrary.forEach(function (book, index) {
    addRowToTable(book, index)
});


function deleteRow(rowIndex) {
    const row = document.querySelectorAll(`[data-index='${rowIndex}']`)[0];
    if(row) {
        row.remove();
    };
}

function toggleStatus(rowIndex) {
    myLibrary[rowIndex].toggleStatus();

    const row = document.querySelectorAll(`[data-index='${rowIndex}']`)[0];
    const status = row.querySelector(".status");
    status.textContent = (myLibrary[rowIndex].status === true) ? "📖" : "📘";

    console.log(myLibrary[rowIndex].info());
}


// hook up buttons and dialog for adding new books
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const cancelButton = document.querySelector("#cancelButton");
const submitButton = document.querySelector("#submitButton");

showButton.addEventListener('click', () => {
    dialog.show();
});

cancelButton.addEventListener('click', () => {
    dialog.close();
});

submitButton.addEventListener('click', () => {
    dialog.close();
})


const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(form); //fires the formdata event
})

form.addEventListener("formdata", (e) => {
    console.log("formdata event fired");

    const data = e.formData;

    const status = (data.get("status") === "read") ? true : false;

    inputBook = new Book(data.get("book_title"), data.get("author"), data.get("page_count"), status);
    addBookToLibrary(inputBook);
    newIndex = myLibrary.length - 1;
    console.log(`new index is ${newIndex}`);
    addRowToTable(inputBook, newIndex);
})