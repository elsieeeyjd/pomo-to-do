
//1. DATE

const today = new Date();
const dayName = today.toLocaleDateString("en-UK", {weekday:"long"});
const dayNumber = today.getDate();
const monthName = today.toLocaleDateString("en-UK", {month:"long"});

document.getElementById("dayName").textContent = dayName;
document.getElementById("dayNumber").textContent = dayNumber; 
document.getElementById("monthName").textContent = monthName; 

// 2. ADD TASK 

const addBtn = document.getElementById("add-task");
const newTask = document.getElementById("task-input");
const tasks = document.getElementById("tasks");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const taskText = newTask.value.trim();
    if (taskText !== ""){
        const task = document.createElement("div");
        task.className = "task"; 
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", updateProgress);
        checkbox.className = "task-content";

        const textSpan = document.createElement("span");
        textSpan.textContent = taskText; 
        textSpan.className = "taskText task-content";
        textSpan.style.fontSize = "20px";

        const removeBtn = document.createElement("button");
        const removeIcon = document.createElement("img");
        removeBtn.className = "task-content";
        removeBtn.style.backgroundColor = "transparent";
        removeBtn.style.border = "none";
        removeIcon.src = "assets/x.png";
        removeIcon.style.width = "15px";
        removeIcon.style.height = "auto";
        removeIcon.onmousedown = () => {
            removeIcon.src = "assets/x-c.png";
        };
        removeIcon.onmouseup = () => {
            removeIcon.src = "assets/x.png";
        };
 
        removeBtn.appendChild(removeIcon);

        removeBtn.addEventListener("click", () => {
            task.remove();
            updateProgress();
        });

        task.appendChild(checkbox);
        task.appendChild(textSpan);
        task.appendChild(removeBtn);

        tasks.appendChild(task);
        newTask.value = "";
        updateProgress();
    }

});

//3. UPDATE PROGRESS BAR

function updateProgress() {
    const checkboxes = document.querySelectorAll('.task input[type="checkbox"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length; 
    const total = checkboxes.length; 

    const progressPercent = total === 0 ? 0 : (checked/total) * 100;
    document.querySelector('.progress-fill').style.width = `${progressPercent}%`;

    const label = document.getElementById("progress-label")
    label.textContent = `${checked}/${total} tasks done`;

    console.log("progress updated");
};

//4. CLEAR TASK LIST 

const clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", () => {
    tasks.innerHTML = "";
    updateProgress();
})