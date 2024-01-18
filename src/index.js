const formSubmission = document.getElementById('taskForm');

// This function will make sure that all of my tasks are rendered
// in the TO DO LIST section
function renderTask(task) {
    //  Where the <tr></tr> element with its contents will be appended
    const tableBody = document.getElementById('table-Body');


    // Since my task are displayed in rows I want to append it on the <tbody></tbody> tag in the TO DO LIST section
    const tableRow = document.createElement('tr');

    tableRow.className = 'table-header';

    tableRow.innerHTML = `
    <td>
        <input type="checkbox" id="myCheckbox-${task.id}">
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
        <button id="deleteButton-${task.id}">X</button>
    </td>
    `;
    
    // Appending the tableRow to tableBody
    tableBody.appendChild(tableRow);
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
        completed: false
    };
    
    // After submmission the task should be renderd
    renderTask(taskObj);
}
