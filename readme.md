# Final Task Manager – Shay O

A React task management application.

The application allows users to:
- Add new tasks with text and an optional deadline
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Filter tasks by status (All / Active / Completed)
- See how many active tasks remain
- Save tasks in LocalStorage so they remain after page refresh
- View the creation date and time for each task

## Running the Project Locally

```bash
npm install
npm run dev

App – Manages the main tasks state, CRUD logic, filtering, and saving/loading from LocalStorage.

TaskForm – Form for adding a new task, including task text and deadline selection.

FilterBar – Controls task filtering and visually highlights the active filter.

TaskList – Displays the list of tasks according to the selected filter.

TaskItem – Represents a single task with options to toggle completion, edit, delete, and display time information.

TaskCounter – Displays the number of active (not completed) tasks remaining.

Known Limitations / Issues

There is currently no validation to prevent setting a deadline in the past.

Tasks are not automatically sorted by date.

Update README for final submission
