// Select elements from the DOM
const habitInput = document.getElementById('habit-input');
const habitSubmit = document.getElementById('habit-submit');
const resetHabits = document.getElementById('reset-habits');
const habitRows = document.getElementById('habit-rows');

// Save habit to localStorage
function saveHabit(habitName) {
    localStorage.setItem('habits', JSON.stringify(habits));  
}

// Load habit from localStorage
function loadHabits() {
    return JSON.parse(localStorage.getItem('habits') || '[]');
}

// Function to add new habit to weekly calendar table

function renderHabitInTable(habit) {
    const row = document.createElement('tr');
    
    // Habit name cell
    const habitCell = document.createElement('td');
    habitCell.textContent = habit.name;
    row.appendChild(habitCell);

    habitRows.appendChild(row);  // Add the row to the table
}
    // Add checkboxes for each day of the week
    for (let i = 0; i < 7; i++) {
        const cell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        cell.appendChild(checkbox);
        row.appendChild(cell);
    }

// Add habit
habitSubmit.addEventListener('click', () => {
    const habitName = habitInput.value.trim();
    if (habitName) {
        const habits = loadHabits();
        const newHabit = { name: habitName, progress: Array(7).fill(false) }; // Create an array of 7 booleans initially set to false
        habits.push(newHabit);
        saveHabits(habits);
        renderHabitInTable(newHabit);
        habitInput.value = ''; // Clear input field after habit submit
    }
});

// Update habit progress in localStorage
function updateHabitProgress(habitName, dayIndex, isChecked) {
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const habit = habits.find(h => h.name === habitName);
    if (habit) {
        habit.progress[dayIndex] = isChecked;  // Update the progress for the specific day
        localStorage.setItem('habits', JSON.stringify(habits));  // Save updated habits
    }
}