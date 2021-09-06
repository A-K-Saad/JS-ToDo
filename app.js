const listContainer = document.getElementById("list-container");
const inputFiled = document.getElementById("input-field");
const addBtn = document.getElementById("button-add");
const pendingNumber = document.getElementById("pending-number");
const deleteAllBtn = document.getElementById("delete-all");

addBtn.addEventListener("click", (event) => {
    event.preventDefault()
});

//Getting data from localstorage
const getDataFromStorage = () => {
    listContainer.textContent = "";
    const getLocalStorage = localStorage.getItem("Todo");
    let todoList;
    if (!getLocalStorage) {
        todoList = [];
    }
    else {
        todoList = JSON.parse(getLocalStorage);
    }
    todoList.push(inputFiled.value);
    inputFiled.value = "";
    localStorage.setItem("Todo", JSON.stringify(todoList));
    showLists();
    addBtn.setAttribute("disabled", true);
};
//Showing tasks
const showLists = () => {
    const getLocalStorage = localStorage.getItem("Todo");
    let todoList;
    if (!getLocalStorage) {
        todoList = [];
    }
    else {
        todoList = JSON.parse(getLocalStorage);
    }
    /* todoList.forEach((element, index) => {
        const singleTask = document.createElement("li");
        singleTask.classList.add("single-work", "my-2", "p-3");
        singleTask.innerHTML += `${element}<i class="fas fa-trash" onclick="deleteTask(${index})"></i>`;
        listContainer.appendChild(singleTask);
    }); */
    let newLiTag = '';
    todoList.forEach((element, index) => {
        newLiTag += `<li class="single-work my-2 p-3">${element}<i class="fas fa-trash" onclick="deleteTask(${index})"></i></li>`;

        if (todoList.length > 0) {
            deleteAllBtn.removeAttribute("disabled");
        }
        else {
            deleteAllBtn.setAttribute("disabled", true);
        }
    });
    listContainer.innerHTML = newLiTag;
    pendingNumber.innerText = todoList.length;
}
//Deleting tasks
const deleteTask = (index) => {
    const getLocalStorage = localStorage.getItem("Todo");
    todoList = JSON.parse(getLocalStorage);
    todoList.splice(index, 1);
    //Update the list after removing
    localStorage.setItem("Todo", JSON.stringify(todoList));
    showLists();
    if (todoList.length > 0) {
        deleteAllBtn.removeAttribute("disabled");
    }
    else {
        deleteAllBtn.setAttribute("disabled", true);
    }
}
showLists();

//Disableing button for empty value
const disableBtn = () => {
    inputFiled.addEventListener("keyup", () => {
        if ((inputFiled.value).trim() !== "") {
            addBtn.removeAttribute("disabled");
        }
        else {
            addBtn.setAttribute("disabled", true);
        }
    });
}
disableBtn();

//Deleting all button
deleteAllBtn.addEventListener("click", () => {
    todoList = [];
    localStorage.setItem("Todo", JSON.stringify(todoList));
    showLists();
    deleteAllBtn.setAttribute("disabled", true);
});