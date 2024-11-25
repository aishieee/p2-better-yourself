// Select elements from the DOM
const habitForm = document.getElementById('add-habit-form');
const habitInput = document.getElementById('habit-input');
const habitsList = document.getElementById('habits');

// Function for user to add habit to the list from input field
function addHabit(event) {
    event.preventDefault();
    const habitText = habitInput.value.trim();
    if (habitText) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="habit-text">${habitText}</span>
            <button class="habit-remove">Remove</button>
        `;
        habitsList.appendChild(listItem);
        habitInput.value = ''; // Clear the input field
        saveHabits(); // Save habits when a new one is added
    }
}

// Listen for form submissions and click events
habitForm.addEventListener('submit', addHabit);
