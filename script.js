// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        // A simple shake effect on the input if empty
        taskInput.style.borderColor = "#ff4757";
        setTimeout(() => {
            taskInput.style.borderColor = "transparent";
        }, 500);
        return;
    }

    // Create list item (li)
    const li = document.createElement("li");

    // Create span for text
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);

    // Create delete button (using a cross symbol ✖)
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#10006;"; // HTML entity for a heavy X
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);

    // Append li to list
    taskList.appendChild(li);

    // Clear input and refocus
    taskInput.value = "";
    taskInput.focus();

    // --- Event Listeners ---

    // 1. Check/Uncheck Task
    li.addEventListener("click", function() {
        li.classList.toggle("checked");
    });

    // 2. Delete Task with Animation
    deleteBtn.addEventListener("click", function(e) {
        e.stopPropagation(); // Prevent triggering the 'checked' event

        // Add the 'fall' class to trigger the CSS transition
        li.classList.add("fall");

        // Wait for the transition to end, then remove the element
        li.addEventListener('transitionend', function() {
             // Ensure the element is still there before trying to remove it
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }
        });
        
        // Fallback: Sometimes transitionend doesn't fire reliably in all complex scenarios.
        // A backup timeout ensures it gets removed.
        setTimeout(() => {
             if (li.parentNode === taskList && li.classList.contains('fall')) {
                 taskList.removeChild(li);
             }
         }, 600); // Matches the CSS transition duration + buffer
    });
}

// Event Listener for Add Button
addBtn.addEventListener("click", addTask);

// Event Listener for Enter Key
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});