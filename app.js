//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task");//Add a new task.
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder = document.getElementById("incompleted-tasks");//ul of #incompleteTasks
var completedTaskHolder = document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement = function (taskString) {

    var listItem = document.createElement("li");
    //input (checkbox)
    var checkBox = document.createElement("input");//checkbx
    //label
    var label = document.createElement("label");//label
    //input (text)
    var editInput = document.createElement("input");//text
    //button.edit
    var editButton = document.createElement("button");//edit button

    //button.delete
    var deleteButton = document.createElement("button");//delete button
    var deleteButtonImg = document.createElement("img");//delete button image


    listItem.className = "list__item app__line";


    label.innerText = taskString;
    label.className = "task app__line-name";

    //Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task app__line-input";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "app__line-button app__line-button_edit";
    deleteButton.className = "app__line-button app__line-button_delete";

    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.className = "app__delete-img";
    deleteButtonImg.setAttribute('alt', 'remove icon');
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing task.

var editLine = function () {
    // console.log("Edit Task...");
    // console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;
    console.log(listItem);

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".app__line-button_edit");
    var containsClass = listItem.classList.contains("list__item_edit");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.

        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("list__item_edit");
    //toggle .editmode on the parent.
};


//Delete task.
var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function () {
    console.log("Completed Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    var taskDont = listItem.querySelector('label');
    taskDont.className = "task app__line-name app__line-name_done";
    // taskDont.classList.add('task_done');
    completedTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function () {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem = this.parentNode;
    var taskDont = listItem.querySelector('label');
    taskDont.className = "task app__line-name";
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest = function () {
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.app__line-button_edit");
    var deleteButton = taskListItem.querySelector("button.app__line-button_delete");


    //Bind editTask to edit button.
    checkBox.onchange = checkBoxEventHandler;
    deleteButton.onclick = deleteTask;
    editButton.onclick = editLine;
    //Bind deleteTask to delete button.
    //Bind taskCompleted to checkBoxEventHandler.
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTaskHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.