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