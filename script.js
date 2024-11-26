const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input')
const itemList = document.querySelector('#item-list')
//const itemForm = document.querySelector('#item-form')

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value

    //validate input
    if (newItem === '') {
        alert('Please add an item')
        return;
    }

    //Create list item
    addListItem(newItem)

    itemInput.value = '';

}

//Create list item only. Using for Debugging since live preview is breaking
function addListItem(text) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(text))

    const button = createButtonWithIcon('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

    return li
}

//Make the Button with the icon
function createButtonWithIcon(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

//Make the Icon
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}



//Event Listeners
itemForm.addEventListener('submit', addItem)