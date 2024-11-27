// Select elements from the DOM
const habitInput = document.getElementById('habit-input');
const habitSubmit = document.getElementById('habit-submit');
const resetHabits = document.getElementById('reset-habits');
const habitRows = document.getElementById('habit-rows');

// Save habits to local storage
function saveHabits(habits) {
    localStorage.setItem('habits', JSON.stringify(habits));
}
