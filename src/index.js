const formSubmission = document.getElementById('taskForm');

// Spliting because I only need the date part not the Time part ("2023-12-06T15:30:45.500Z")
// Array after spliting -->["2023-12-06", "15:30:45.500Z"]
const currentDate = new Date().toISOString().split('T')[0];
document.getElementById('dueDate').setAttribute('min', currentDate);


// This function will make sure that all of my tasks are rendered
// in the TO DO LIST section
function renderOneTask(task) {
    console.log("Rendering Task: ", task)
    //  Where the <tr></tr> element with its contents will be appended
    const tableBody = document.getElementById('table-Body');


    // Since my task are displayed in rows I want to append it on the <tbody></tbody> tag in the TO DO LIST section
    const tableRow = document.createElement('tr');

    tableRow.className = 'table-header';

    tableRow.innerHTML = `
        <td>
            <input type="checkbox" id="myCheckbox">
        </td>
        <td>
            ${task.taskName}
        </td>
        <td>
            ${task.dueDate}
        </td>
        <td>
            ${task.priority}
        </td>
        <td>
            <button id="deleteButton">X</button>
        </td>
    `;

    tableRow.querySelector('#deleteButton').addEventListener('click', function() {
        tableRow.remove();
        deleteTask(task.id);
    });
    tableRow.querySelector('#myCheckbox').addEventListener('click', function() {
        tableRow.remove();
        alert('WELL DONE!! MOVE ON TO NEXT TASK!');
        deleteTask(task.id);
    });
    
    
    
    // Appending the tableRow to tableBody
    tableBody.appendChild(tableRow);
    
}

// Function that updates the deletion of a task
function deleteTask(id) {
    fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((task) => console.log(task))
}

// This function is supposed to sort the order of the tasks in their priority
function sortTasksInOrderOfPriority() {
    const tableBody = document.getElementById('table-Body');

    // Putting the row data to be represented as arrays
    const rows = Array.from(tableBody.getElementsByTagName('tr'));

    const sortedRows = rows.sort(function (rowA, rowB) {
        const priorityOne = rowA.getElementsByTagName('td')[3].textContent;
        const priorityTwo = rowB.getElementsByTagName('td')[3].textContent;

        // Compares High, Low, Medium and sorts it out
        return (priorityOne === priorityTwo ? 0 : priorityOne === 'High' ? -1 : 1);
    });

    // Remove every row first
    tableBody.innerHTML = '';

    // Add them in back again while sorted
    sortedRows.forEach(row => tableBody.appendChild(row));
}


formSubmission.addEventListener('submit', handleSubmit);

// This function will handle the submission of the form

function handleSubmit(event) {
    // First it to prevent the reloading during submission
    event.preventDefault();

    let taskObj = {
        // What I want to be submitted
        taskName: event.target.task.value,
        description: event.target.description.value,
        dueDate: event.target.dueDate.value,
        priority: event.target.priority.value,
    };

    // After submmission the task should be renderd
    addTask(taskObj);
}

function addTask(taskObj) {
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskObj),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return (response.json());
        })
        .then(task => {
            console.log("Task added successfully: ", task);
            // renderOneTask(task);
        })
        .catch(error => console.error('Error adding task:', error));
}

// Getting all the tasks in the db.json file
function getAllTasks() {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => tasks.forEach(task => renderOneTask(task)))
}

function initialize() {
    getAllTasks();
}

initialize();