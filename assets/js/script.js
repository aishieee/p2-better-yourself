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
    habitRows.innerHTML = ''; // Clear existing rows before loading
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    habits.forEach(habit => renderHabitInTable(habit));
    drawCharts(); // Draw charts after loading habits
    return habits;
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
        const habits = JSON.parse(localStorage.getItem('habits') || '[]');
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
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const habit = habits.find(h => h.name === habitName);
    if (habit) {
        habit.progress[dayIndex] = isChecked;  // Update the progress for the specific day
        saveHabits(habits);  // Save updated habits
        drawCharts(); // Update charts
    }
}

// Remove habit
function removeHabit(habitName) {
    let habits = JSON.parse(localStorage.getItem('habits') || '[]');
    habits = habits.filter(habit => habit.name !== habitName);
    saveHabits(habits);
    loadHabits(); // Refresh table after removal
}

// Draw Google charts
function drawCharts() {
    drawProgressPieChart();
    drawHabitBarChart();
}

// Draw the progress pie chart based on habits completed 
function drawProgressPieChart() {
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    let totalDays = habits.length * 7;
    let completedDays = 0;
    
    // Loop through each habit to calculate completed days
    habits.forEach(habit => {
    completedDays += habit.progress.filter(day => day).length;
});

let remainingDays = totalDays - completedDays; // Calculate the remaining days

// Create the data table for the pie chart
const data = google.visualization.arrayToDataTable([
    ['Status', 'Days'],
    ['Completed', completedDays], 
    ['Remaining', remainingDays] 
]);

const options = {
    title: 'Habit Completion Progress',
    pieHole: 0.4,
    colors: ['#ff66b3', '#f3f1f5'],
    fontName: 'Poppins',
    titleTextStyle: { color: '#8c52ff', fontSize: 16 }
};

const chart = new google.visualization.PieChart(document.getElementById('progress-pie-chart'));
chart.draw(data, options);
}

// Draw the habit bar chart based on the amount of times each habit was completed

function drawHabitBarChart() {
    const habits = JSON.parse(localStorage.getItem('habits') || []);
    // Transform habit data into an array of [habit name, times completed]
    const habitData = habits.map(habit => {
    // Count the number of true values in the progress array
    const timesCompleted = habit.progress.filter(day => day).length;
    return [habit.name, timesCompleted]; 
});

// Create the data table for the bar chart
const data = google.visualization.arrayToDataTable(
    habitData.length > 0 ? 
    [['Habit', 'Times Practiced'], ...habitData] : 
    [['Habit', 'Times Practiced'], ['', 0]] // Fallback for no habits 
);

const options = {
    title: 'Habit Ranking', 
    hAxis: { 
        title: 'Times Practiced',
        textStyle: { color: '#8c52ff', fontSize: 12 } 
    },
    colors: ['#8c52ff'], 
    fontName: 'Poppins', 
    titleTextStyle: { color: '#8c52ff', fontSize: 16 },
    legend: 'none',
};

const chart = new google.visualization.BarChart(document.getElementById('habit-bar-chart'));
chart.draw(data, options); 
}

// Initial load
loadHabits();

