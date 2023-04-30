// Book and Author classes
class Book {
    constructor(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }
}

class Author {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

// Adapter pattern
class BookAdapter {
    constructor(book) {
        this.book = book;
    }

    getName() {
        return this.book.getTitle();
    }
}

class AuthorAdapter {
    constructor(author) {
        this.author = author;
    }

    getName() {
        return this.author.getName();
    }
}

// Bridge pattern
class LibraryRenderer {
    constructor(renderMethod) {
        this.renderMethod = renderMethod;
    }

    render(data) {
        this.renderMethod.render(data);
    }
}

class ListRenderMethod {
    constructor(parentElement) {
        this.parentElement = parentElement;
    }

    render(data) {
        const listItem = document.createElement("li");
        listItem.textContent = data.getName();
        this.parentElement.appendChild(listItem);
    }
}

// Composite pattern
class LibraryItemCollection {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    render(renderer) {
        this.items.forEach(item => renderer.render(item));
    }
}

// Decorator pattern
class SpecialItem {
    constructor(item) {
        this.item = item;
    }

    getName() {
        return `*${this.item.getName()}*`;
    }
}

const bookList = document.getElementById("bookList");
const authorList = document.getElementById("authorList");
const addBookButton = document.getElementById("addBook");
const deleteBookButton = document.getElementById("deleteBook");
const addAuthorButton = document.getElementById("addAuthor");
const deleteAuthorButton = document.getElementById("deleteAuthor");
const bookCollection = new LibraryItemCollection();
const authorCollection = new LibraryItemCollection();
const bookRenderer = new LibraryRenderer(new ListRenderMethod(bookList));
const authorRenderer = new LibraryRenderer(new ListRenderMethod(authorList));

addBookButton.addEventListener("click", () => {
    const bookTitle = prompt("Enter book title:");
    const book = new Book(bookTitle);
    const bookAdapter = new BookAdapter(book);
    const specialBook = new SpecialItem(bookAdapter);
    bookCollection.addItem(specialBook);
    bookRenderer.render(specialBook);
});

addAuthorButton.addEventListener("click", () => {
    const authorName = prompt("Enter author name:");
    const author = new Author(authorName);
    const authorAdapter = new AuthorAdapter(author);
    const specialAuthor = new SpecialItem(authorAdapter);
    authorCollection.addItem(specialAuthor);
    authorRenderer.render(specialAuthor);
});

deleteBookButton.addEventListener("click", () => {
    const bookTitle = prompt("Enter the title of the book to delete:");
    bookCollection.items = bookCollection.items.filter(book => book.getName() !== bookTitle);
    bookList.innerHTML = '';
    bookCollection.render(bookRenderer);
});

deleteAuthorButton.addEventListener("click", () => {
    const authorName = prompt("Enter the name of the author to delete:");
    authorCollection.items = authorCollection.items.filter(author => author.getName() !== authorName);
    authorList.innerHTML = '';
    authorCollection.render(authorRenderer);
});
