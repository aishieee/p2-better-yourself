# Habit Tracker - Better Yourself

This project is a simple yet effective habit tracker built using HTML, CSS, and JavaScript. It enables users to track their habits throughout the week, empowering them to improve their behaviour and discipline. Users can add new habits, log their daily progress, and visualise this achievement through interactive Google Charts. The site uses the browser's localStorage to save habits and progress across sessions.

# Project Goals 

User goals:
- **Encourage Self-Improvement:** Help users reflect on their habits and identify areas for improvement to promote discipline and positive behavior.
- **Interactive Tracking:** Provide an engaging interface for adding habits and marking daily progress. 
- **Visual Insights:** Offer visually appealing and easy-to-understand Google Charts to help users monitor progress and focus on achieving their goals.
- **Skill Development:** Support users in enhancing their skills by forming and maintaining productive habits.

Site owner goals:
- **Drive Engagement:** Create a website that encourages users to increase productivity and adopt better habits.
- **Provide Value:** Develop a meaningful tool that benefits individuals looking to foster growth and self-improvement.


# Features

### 1. Habit Management

**Add New Habits:** Users can input any habit they want to track using the input field. New habits appear in a dynamic table.
**Reset All Habits:** Users can clear all habits from the table and reset their progress to start fresh.

![Habit input field](assets/images/habit-management.png)

### 2. Habit Tracking Table
**Daily Progress Tracking:** Users can mark each day of the week as completed using a row of checkboxes for every habit.
**Data Storage:** All habits and progress are saved using the browser's localStorage, ensuring data remains available even after the page reloads.
**Remove Habits:** Users can delete individual habits they no longer wish to track.

![Habit tracking table](assets/images/table.png)

### 3. Progress Visualisation
**Interactive Google Charts:** Two charts provide a clear visual on habit progress:
Pie Chart: Displays the proportion of completed versus remaining (incomplete) habit days for the week.
Bar Chart: Represents habits based on the number of times they were completed during the week, showing a visual summary of performance.

![Google Charts](assets/images/charts.png)

# Testing

### HTML

[W3C HTML Validator](https://validator.w3.org/) was run to check the index.html code. There were no errors or warnings found.

![W3C HTML validator](assets/images/html-checker.png)

### CSS

[W3C CSS Validator](https://jigsaw.w3.org/css-validator/) was run to check the style.css code. There were no errors found.

![W3C CSS validator](assets/images/css-checker.png)

### Javascript

[JSHint](https://jshint.com/) was used to check the script.js code. 

Code Metrics: 

**Analysed Number of Functions:** 20
**Function Arguments:**
- Largest signature: 3 arguments
- Median signature: 1 argument
**Function Size:**
- Largest function: 13 statements
- Median function: 1.5 statements
**Cyclomatic Complexity:**
- Most complex function: 3
- Median complexity: 1

JSHint Warnings and Fixes:

Initially, there were warnings related to the use of ECMAScript 6 (ES6) features, which were not recognised by JSHint. Also, JSHint flagged Google as an unrecognised variable since I was using this for my charts. To address these issues, I added the necessary configuration at the beginning of the file to ensure ES6 compatibility. Additionally, I replaced inline comments above each function with docstrings for improved clarity and documentation.

After implementing these changes, I re-ran JSHint, and no further warnings were detected.

![JSHint](assets/images/jshint.png)

### Accessibility 

- I inspected the website using Google Chrome Developer tools and ran the pages through Lighthouse. This confirmed that the colours and fonts are easy to read, and the site is accessible, as it received all green scores.

- I tested and confirmed that the page works in different browsers; Chrome, Safari and Firefox.

![Google Chrome developer](assets/images/accessibility.png)


