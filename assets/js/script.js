// Load Google Charts
google.charts.load('current', { packages: ['corechart', 'bar'] });

// Select elements from the DOM
const habitInput = document.getElementById('habit-input');
const habitSubmit = document.getElementById('habit-submit');
const resetHabits = document.getElementById('reset-habits');
const habitRows = document.getElementById('habit-rows');

// Save habits to localStorage
function saveHabits(habits) {
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Load habits from localStorage
function loadHabits() {
    return JSON.parse(localStorage.getItem('habits') || '[]');
}

// Render habits
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
        checkbox.checked = habit.progress[i] || false;
        checkbox.addEventListener('change', () => {
            updateHabitProgress(habit.name, i, checkbox.checked);
        });
        cell.appendChild(checkbox);
        row.appendChild(cell);
    }

    // Add a "Remove" button
    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn'; // for styling
    removeButton.addEventListener('click', () => {
        removeHabit(habit.name);
    });
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    // Append entire row to the habitRows container
    habitRows.appendChild(row);
}

// Add habit
habitSubmit.addEventListener('click', () => {
    const habitName = habitInput.value.trim();
    if (habitName) {
        const habits = loadHabits();
        const newHabit = { name: habitName, progress: Array(7).fill(false) }; // Array of 7 booleans set to false
        habits.push(newHabit);
        saveHabits(habits);
        renderHabitInTable(newHabit);
        habitInput.value = ''; // Clear input field after habit submit
    }
});

// Reset habits
resetHabits.addEventListener('click', () => {
    localStorage.removeItem('habits'); // Clear all habits
    habitRows.innerHTML = '';         // Clear the table
});

// Update habit progress in localStorage
function updateHabitProgress(habitName, dayIndex, isChecked) {
    const habits = loadHabits();
    const habit = habits.find(h => h.name === habitName);
    if (habit) {
        habit.progress[dayIndex] = isChecked;  // Update the progress for the specific day
        saveHabits(habits);  // Save updated habits
    }
}

// Remove habit
function removeHabit(habitName) {
    let habits = loadHabits();
    habits = habits.filter(habit => habit.name !== habitName);
    saveHabits(habits);
    loadAndRenderHabits(); // Refresh table
}

// Draw Google Charts

// Load and render habits
function loadAndRenderHabits() {
    habitRows.innerHTML = ''; // Clear existing rows
    const habits = loadHabits();
    habits.forEach(habit => renderHabitInTable(habit));
}

// Initial load
loadAndRenderHabits();

