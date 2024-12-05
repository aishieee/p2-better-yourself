/* jshint esversion: 6 */
/* global google */

/**
 * Load Google Charts library with required packages.
 */
google.charts.load('current', { packages: ['corechart', 'bar'] });

/**
 * Select elements from the DOM for interaction.
 */
const habitInput = document.getElementById('habit-input');
const habitSubmit = document.getElementById('habit-submit');
const resetHabits = document.getElementById('reset-habits');
const habitRows = document.getElementById('habit-rows');

/**
 * Save the list of habits to the browser's localStorage.
 * @param {Array} habits - Array of habit objects to save.
 */
function saveHabits(habits) {
    localStorage.setItem('habits', JSON.stringify(habits));
}

/**
 * Load the list of habits from the browser's localStorage
 * and render them in the habit table. Updates the charts.
 * @returns {Array} - Array of habit objects loaded from localStorage.
 */
function loadHabits() {
    habitRows.innerHTML = ''; // Clear existing rows before loading
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    habits.forEach(habit => renderHabitInTable(habit));
    drawCharts(); // Draw charts after loading habits
    return habits;
}

/**
 * Render a single habit in the habit table, including name, progress checkboxes, 
 * and a remove button.
 * @param {Object} habit - The habit object to render.
 */
function renderHabitInTable(habit) {
    const row = document.createElement('tr');
    
    // Habit name cell
    const habitCell = document.createElement('td');
    habitCell.textContent = habit.name;
    row.appendChild(habitCell);

    // Add checkboxes for each day of the week
    habit.progress.forEach((checked, i) => {
        const cell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checked;
        checkbox.addEventListener('change', function() {
            updateHabitProgress(habit.name, i, this.checked);
        });
        cell.appendChild(checkbox);
        row.appendChild(cell);
    });

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

/**
 * Add a new habit when the user submits the form.
 */
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

/**
 * Reset all habits by clearing localStorage and the table.
 */
resetHabits.addEventListener('click', () => {
    localStorage.removeItem('habits'); // Clear all habits
    habitRows.innerHTML = '';         // Clear the table
});

/**
 * Update the progress of a habit for a specific day and save the changes.
 * @param {string} habitName - The name of the habit to update.
 * @param {number} dayIndex - The index of the day in the progress array.
 * @param {boolean} isChecked - Whether the habit was marked as completed.
 */
function updateHabitProgress(habitName, dayIndex, isChecked) {
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const habit = habits.find(h => h.name === habitName);
    if (habit) {
        habit.progress[dayIndex] = isChecked;  // Update the progress for the specific day
        saveHabits(habits);  // Save updated habits
        drawCharts(); // Update charts
    }
}

/**
 * Remove a habit from the table and localStorage by its name.
 * @param {string} habitName - The name of the habit to remove.
 */
function removeHabit(habitName) {
    let habits = JSON.parse(localStorage.getItem('habits') || '[]');
    habits = habits.filter(habit => habit.name !== habitName);
    saveHabits(habits);
    loadHabits(); // Refresh table after removal
}

/**
 * Draw both the progress pie chart and the habit bar chart using Google Charts.
 */
function drawCharts() {
    drawProgressPieChart();
    drawHabitBarChart();
}

/**
 * Draw a pie chart showing the proportion of completed and remaining habit days.
 */
function drawProgressPieChart() {
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    let totalDays = habits.length * 7;
    let completedDays = habits.reduce((sum, habit) => sum + habit.progress.filter(day => day).length, 0);
    let remainingDays = totalDays - completedDays; // Calculate the remaining days

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

/**
 * Draw a bar chart showing how many times each habit was practiced.
 */
function drawHabitBarChart() {
    const habits = JSON.parse(localStorage.getItem('habits') || []);
    const habitData = habits.map(habit => [habit.name, habit.progress.filter(day => day).length]);

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

/**
 * Load habits and initialize the app on page load.
 */
loadHabits();
