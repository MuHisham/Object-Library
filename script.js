const myLibrary = [];

function Book(title, author, noOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.isRead = isRead;
    this.info = () => `${this.title} by ${this.author}, ${this.noOfPages} pages, ${this.isRead}`;
}

function addBookToLibrary(title, author, noOfPages, isRead) {
    const aNewBook = new Book(title, author, noOfPages, isRead);
    myLibrary.push(aNewBook);
}

const library = document.querySelector(".library");
let cards = document.querySelectorAll(".card")
const add = document.querySelector(".add")
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const form = document.querySelector("form");
let removeButtons = document.querySelectorAll(".remove");

library.addEventListener("mouseenter", () => {
    cards = document.querySelectorAll(".card")
    cards.forEach(card => {
        card.style.cssText = "animation-play-state: paused";
    })
})
library.addEventListener("mouseleave", () => {
    cards = document.querySelectorAll(".card")
    cards.forEach(card => {
        card.style.cssText = "animation-play-state: running";
    })
})

add.addEventListener("click", () => {
    modal.style.display = "block";
})
span.onclick = function() {
    modal.style.display = "none";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    cards.forEach(card => {
        card.classList.remove('animate');
    });
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);
    console.log(formObj.status);
    addBookToLibrary(formObj.title, formObj.author, formObj.pages, formObj.status);
    library.replaceChildren();
    createCardElements();
    cards = document.querySelectorAll(".card")
    span.click();
    cards.forEach(card => {
        card.classList.add('animate');
    });
});

function createCardElements() {
    for (let i = 0; i < myLibrary.length; i++) {
        const outerDiv = document.createElement("div");
        outerDiv.className = "card";
        const heading = document.createElement("h2");
        heading.textContent = myLibrary[i].title;
        const innerdiv = document.createElement("div");
        innerdiv.className = "card-details"

        const innerPTagOne = document.createElement("p");
        const innerSpanOne = document.createElement("span");
        innerSpanOne.className = "details";
        innerSpanOne.textContent = "Author:";
        innerPTagOne.appendChild(innerSpanOne);
        innerPTagOne.append(` ${myLibrary[i].author}`);

        const innerPTagTwo = document.createElement("p");
        const innerSpanTwo = document.createElement("span");
        innerSpanTwo.className = "details";
        innerSpanTwo.textContent = "Pages:";
        innerPTagTwo.appendChild(innerSpanTwo);
        innerPTagTwo.append(` ${myLibrary[i].noOfPages}`);


        const btnsInnerDiv = document.createElement("div");
        const toggleBtn = document.createElement("button");
        const removeBtn = document.createElement("button");
        btnsInnerDiv.className = "buttons";
        toggleBtn.className = (myLibrary[i].isRead === "Read") ? "read" : "notRead";
        toggleBtn.textContent = (myLibrary[i].isRead === "Read") ? "Read" : "Not Read Yet";
        toggleBtn.addEventListener("click", () => {
            let TBIndex = Array.from(library.childNodes).indexOf(toggleBtn.parentNode.parentNode);
            if (toggleBtn.className === "read") {
                myLibrary[TBIndex].isRead = "Not Read Yet";
                toggleBtn.className = "notRead";
                toggleBtn.textContent = "Not Read Yet";
            }
            else {
                myLibrary[TBIndex].isRead = "Read";
                toggleBtn.className = "read";
                toggleBtn.textContent = "Read";
            }
        })
        removeBtn.className = "remove";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            removeButtons = Array.from(document.querySelectorAll(".remove"));
            removeBookFromLibrary(removeButtons.indexOf(removeBtn));
        })
        btnsInnerDiv.appendChild(toggleBtn);
        btnsInnerDiv.appendChild(removeBtn);

        innerdiv.appendChild(innerPTagOne);
        innerdiv.appendChild(innerPTagTwo);
        outerDiv.appendChild(heading);
        outerDiv.appendChild(innerdiv);
        outerDiv.appendChild(btnsInnerDiv);
        library.appendChild(outerDiv);
    }
}

function removeBookFromLibrary(index) {
    removeButtons.splice(index, 1);
    myLibrary.splice(index, 1);
    library.removeChild(library.childNodes[index]);
}