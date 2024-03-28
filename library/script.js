const myLibrary = [];

function Book(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
    this.haveReadString = haveRead ? "has been read" : "has not been read";

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.haveReadString}`;
    }

}

function addBookToLibrary() {

}


const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
