// Select elements from the DOM
const habitInput = document.getElementById('habit-input');
const habitSubmit = document.getElementById('habit-submit');
const resetHabits = document.getElementById('reset-habits');
const habitRows = document.getElementById('habit-rows');

// Function for user to use "Add habit" button 
habitSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    const habitName = habitInput.value.trim();
    console.log('Habit added:', habitName);  // For now, log habit name to the console
});

// Save habit to localStorage
function saveHabit(habitName) {
    localStorage.setItem('habits', JSON.stringify(habits));  
}

// Load habit from localStorage
function loadHabits() {
    return JSON.parse(localStorage.getItem('habits') || '[]');
}

// Add habit and save it
habitSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    const habitName = habitInput.value.trim();
    if (habitName) {
        saveHabit(habitName);  // Save habit
        habitInput.value = '';  // Clear input field
    }
});

// Function to add new habit to weekly calendar table

function renderHabitInTable(habit) {
    const row = document.createElement('tr');
    
    // Habit name cell
    const habitCell = document.createElement('td');
    habitCell.textContent = habit.name;
    row.appendChild(habitCell);

    habitRows.appendChild(row);  // Add the row to the table
}

habitSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    const habitName = habitInput.value.trim();
    if (habitName) {
        saveHabit(habitName);  // Save the habit
        renderHabitInTable({ name: habitName });  // Immediately render it in the table
        habitInput.value = '';  // Clear the input field
    }
});

// Render habit in table
function renderHabitInTable(habit) {
    const row = document.createElement('tr');

    // Habit name cell
    const habitCell = document.createElement('td');
    habitCell.textContent = habit.name;
    row.appendChild(habitCell);

    habitRows.appendChild(row);  // Add the row to the table
}

// Add habit and render it in the table
habitSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    const habitName = habitInput.value.trim();
    if (habitName) {
        saveHabit(habitName);  // Save the habit
        renderHabitInTable({ name: habitName });  // Immediately render it in the table
        habitInput.value = '';  // Clear the input field
    }
});

// Render habit with checkboxes for each day of the week
function renderHabitInTable(habit) {
    const row = document.createElement('tr');

    // Habit name cell
    const habitCell = document.createElement('td');
    habitCell.textContent = habit.name;
    row.appendChild(habitCell);

    // Add checkboxes for each day of the week
    for (let i = 0; i < 7; i++) {
        const cell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        cell.appendChild(checkbox);
        row.appendChild(cell);
    }

    habitRows.appendChild(row);  // Add the row to the table
}

// Update habit progress in localStorage
function updateHabitProgress(habitName, dayIndex, isChecked) {
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const habit = habits.find(h => h.name === habitName);
    if (habit) {
        habit.progress[dayIndex] = isChecked;  // Update the progress for the specific day
        localStorage.setItem('habits', JSON.stringify(habits));  // Save updated habits
    }
}

// Render habit with checkboxes and event listener for progress
function renderHabitInTable(habit) {
    const row = document.createElement('tr');

    // Habit name cell
    const habitCell = document.createElement('td');
    habitCell.textContent = habit.name;
    row.appendChild(habitCell);

    // Add checkboxes for each day and update progress when checked
    for (let i = 0; i < 7; i++) {
        const cell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = habit.progress[i] || false;  // Ensure default false when habit progress is undefined, null, or false
        checkbox.addEventListener('change', () => {
            updateHabitProgress(habit.name, i, checkbox.checked);  // Update progress on change
        });
        cell.appendChild(checkbox);
        row.appendChild(cell);
    }
}