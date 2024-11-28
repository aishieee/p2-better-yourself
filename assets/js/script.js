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