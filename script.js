const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addListItem(item));
    checkUI();
}

function addItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    //validate input
    if (newItem === "") {
        alert("Please add an item");
        return;
    }

    //Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector(".edit-mode");
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove("edit-mode");
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            alert("item already exists");
            return;
        }
    }

    //Create list item on document
    addListItem(newItem);
    //add item to local storage
    addItemToStorage(newItem);

    itemInput.value = "";
}

//Create list item only.
function addListItem(text) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));

    const button = createButtonWithIcon("remove-item btn-link text-red");
    li.appendChild(button);

    checkUI();
    itemList.appendChild(li);

    return li;
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;

    //figure out what the current set of items in storage is, make it into a list
    if (localStorage.getItem("items") === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }
    return itemsFromStorage;
}

//Make the Button with the icon
function createButtonWithIcon(classes) {
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

//Make the Icon
function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

function onClickItem(e) {
    //parent of the x is the button
    button = e.target.parentElement;
    if (button.classList.contains("remove-item")) {
        removeItemFromIcon(button.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();

    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    itemList
        .querySelectorAll("li")
        .forEach((i) => i.classList.remove("edit-mode"));

    isEditMode = true;
    item.classList.add("edit-mode");
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item';
    formBtn.style.backgroundColor = "#228B22";
    itemInput.value = item.textContent;
}

//removes the parent 'li' of the icon
function removeItemFromIcon(item) {
    //remove item from dom
    item.remove();
    //remove item from storage
    removeItemFromStorage(item.textContent);
    checkUI();
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //filter out items to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //put items back into local storage
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//Clears all the items
function clearItems() {
    itemList.innerHTML = "";

    //clear from local storage
    localStorage.removeItem("items");

    checkUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll("li");
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

//check elements for the hiding of filter and clear button, reset UI
function checkUI() {
    itemInput.value = "";
    const items = itemList.querySelectorAll("li");
    if (items.length == 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = "#333";

    isEditMode = false;
    return;
}

//initialize app
function init() {
    //Event Listeners
    itemForm.addEventListener("submit", addItemSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", clearItems);
    itemFilter.addEventListener("input", filterItems);
    document.addEventListener("DOMContentLoaded", displayItems);
    checkUI();
}

init();
