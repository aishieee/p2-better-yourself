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
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    habits.push({ name: habitName, progress: Array(7).fill(false) });  // Add new habit to existing list
    localStorage.setItem('habits', JSON.stringify(habits));  // Save habits to localStorage
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

