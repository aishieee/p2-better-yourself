// Select elements from the DOM
const habitInput = document.getElementById('habit-input');
const habitSubmit = document.getElementById('habit-submit');
const resetHabits = document.getElementById('reset-habits');
const habitRows = document.getElementById('habit-rows');

// Function for user to add habit to the list from input field
habitSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    const habitName = habitInput.value.trim();
    console.log('Habit added:', habitName);  // Log habit name to console for now
});