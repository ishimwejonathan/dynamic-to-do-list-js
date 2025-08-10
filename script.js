document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and render them on the page
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save tasks array to Local Storage
    function saveTasks() {
        // Gather all task texts currently displayed (except the remove button text)
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // The li's textContent includes "Remove" from the button, so we get only the task text
            const taskText = li.firstChild.textContent || li.textContent.replace('Remove', '').trim();
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to the DOM and optionally save to Local Storage
    function addTask(taskText, save = true) {
        if (!taskText) return;

        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task when button clicked
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage after removal
        };

        // Append Remove button and list item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save new task to Local Storage if required
        if (save) {
            saveTasks();
        }
    }

    // Add task button click event
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        addTask(taskText);
        taskInput.value = ''; // Clear input after adding
    });

    // Add task on Enter key press in input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });

    // Load existing tasks when the page loads
    loadTasks();
});
