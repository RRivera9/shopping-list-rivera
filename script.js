const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    //validate input
    if (newItem === "") {
        alert("Please add an item");
        return;
    }

    //Create list item
    addListItem(newItem);

    itemInput.value = "";
}

//Create list item only. Using for Debugging since live preview is breaking
function addListItem(text) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(text));

    const button = createButtonWithIcon("remove-item btn-link text-red");
    li.appendChild(button);

    checkUI();
    itemList.appendChild(li);

    return li;
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

//removes the parent 'li' of the icon
function removeItemFromIcon(e) {
    //parent of icon is the button
    const button = e.target.parentElement;

    //Can do a confirm "are you sure" right here, but I don't like that feature
    if (button.classList.contains("remove-item")) {
        //parent of button is the li
        button.parentElement.remove();
        checkUI();
    }
}

//Clears all the items
function clearItems() {
    itemList.innerHTML = "";
    checkUI();
}

function checkUI() {
    const items = itemList.querySelectorAll("li");
    console.log("made it to checkUI");
    if (items.length == 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }
    console.log("about to return");
    return;
}

//Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItemFromIcon);
clearBtn.addEventListener("click", clearItems);
