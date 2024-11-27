// Select elements from the DOM
const habitInput = document.getElementById('habit-input');
const habitSubmit = document.getElementById('habit-submit');
const resetHabits = document.getElementById('reset-habits');
const habitRows = document.getElementById('habit-rows');

// Save habits to local storage
function saveHabits() {
    const habits = [];
    document.querySelectorAll('#habits .habit-text').forEach(item => {
        habits.push(item.textContent);
    });
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Retrieve habits from local storage and render them
function renderHabits() {
    const storedHabits = JSON.parse(localStorage.getItem('habits') || '[]');
    storedHabits.forEach(habitText => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="habit-text">${habitText}</span>
            <button class="habit-remove">Remove</button>
        `;
        habitsList.appendChild(listItem);
    });
}

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

// Function to remove a habit from the list
function removeHabit(event) {
    if (event.target.classList.contains('habit-remove')) {
        const listItem = event.target.parentElement;
        habitsList.removeChild(listItem);
        saveHabits(); // Save changes after a habit is removed
    }
}

// Listen for form submissions and click events
habitForm.addEventListener('submit', addHabit);
habitsList.addEventListener('click', removeHabit);

// Render stored habits on page load
renderHabits();

