# ProjectFlow

## Description

Welcome to the TODO App, a simple yet powerful task management application that enables you to efficiently organize your projects and tasks. With this app, you can seamlessly add, edit, and delete projects, create, modify, and remove tasks within those projects, and track task progress by marking them as queued, in progress, or completed.

## Technology Stack 📙

This app leverages several technologies to provide a smooth user experience:

- **React**: The core library for building a Single Page Application (SPA).
- **Redux**: A state management library for efficiently handling app data.
- **React-Redux**: Connects the app to the Redux store for data management.
- **Redux-persist**: Persists the Redux store in local storage to prevent data loss on page refresh (Note: This would be replaced with a database and backend in a real-world app).
- **React-Router**: Manages routing within the application.
- **React-Icons**: Adds visually appealing icons to enhance the user interface.
- **React-dropzone**: Facilitates file uploads.
- **TinyMCE**: Incorporates a rich text editor for enhanced task descriptions.

## Live Demo 🎥

Check out the live demo of the app to see it in action: [Live Demo Link](https://zeyadajamy.github.io/todo/)

## Screenshots 📷

Here are some visual representations of the app:

- **Mobile View**: A glimpse of the mobile-friendly interface.

  ![Mobile View](./todo-readme/mobile.png)

- **Create New Project**: How to create a new project.

  ![Create New Project](./todo-readme/todo-create-project.png)

- **Create New Task**: Adding a task to a project on mobile.

  ![Create New Task](./todo-readme/todo-mob-create-task.png)

- **Mobile View - Projects**: Viewing projects on mobile.

  ![Mobile View - Projects](./todo-readme/todo-mob-projects.png)

- **Mobile View - Tasks**: Exploring tasks on mobile.

  ![Mobile View - Tasks](./todo-readme/todo-tasks.png)

- **Task Unfolded**: A detailed view of an expanded task.

  ![Task Unfolded](./todo-readme/task%20unfolded.png)

## Getting Started 🚀

To run the app locally, follow these simple steps:

### Prerequisites

Make sure you have the following software installed on your system:

- NodeJS
- NPM
- Git

### Setup

1. Clone this project to your local machine.
2. Navigate to the project directory using your terminal.
3. Run `npm install` to install the required dependencies. Ensure you have an internet connection and NodeJS installed.
4. Execute `npm start` to launch the app. It will open in your default web browser.
5. Visit `http://localhost:3000/#/todo` to explore the app locally.

### Project Structure

The app's structure is organized as follows:

Certainly! To provide a more detailed explanation of the project structure for developers who want to contribute to the TODO App, let's delve into each directory and its contents:

### `public` Directory

     This directory contains the public assets of the app, including the main HTML file and the favicon icon. Here's a brief overview of the files:

- `index.html`: The main HTML file that serves as the entry point for the React application.
- `favicon.ico`: The favicon icon for the app.

### `src` Directory

     This is the heart of the application, where most of the development work takes place. Here's a breakdown of the subdirectories and their contents:

#### `assets` Directory

     This directory contains any static assets used in the app, such as images or fonts.

#### `components` Directory

     This is where the majority of the React components reside. Each component is organized into its own subdirectory, making it easy to locate and work on specific parts of the app. Here's a brief overview of notable components:

- `404`: Handles the page not found (404) error.
- `file-upload`: Manages file upload functionality.
- `header`: Represents the header component of the app.
- `not-found`: Handles not found-related components.
- `project`: Contains components related to project management, including project creation and listing.
- `tasks`: Manages tasks within projects, including task creation, editing, and progress tracking.
- `tinymce`: Integrates the TinyMCE rich text editor.
- `window-modal`: Provides reusable window modal components.
- `layout.tsx`: Defines the overall layout of the application.

#### `hooks` Directory

- `useStore.ts`: Custom hook for accessing the Redux store within components.

#### `store` Directory

     This directory manages the application's state using Redux. It's structured as follows:

- `actions`: Contains Redux action creators, such as `projectActions.ts`.
- `reducers`: Holds Redux reducers, including `projectsReducer.ts`.
- `store.ts`: Configures and creates the Redux store.

#### `types.ts`

     Defines custom TypeScript types and interfaces used throughout the application.

#### `index.tsx`

     The entry point of the application where React is rendered into the DOM.

#### `package.json` and `package-lock.json`

     These files manage the project's dependencies and scripts.

#### `README.md`

     The project's README file, providing essential information for developers, including setup instructions, project structure, and contributing guidelines.

#### `tsconfig.json`:

     Configuration file for TypeScript settings.

- Here's the complete project structure:

```
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── assets
│   ├── components
│   │   ├── 404
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── file-upload
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── header
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── not-found
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── project
│   │   │   ├── index.tsx
│   │   │   ├── styles.ts
│   │   │   ├── project-form.tsx
│   │   │   └── project-list.tsx
│   │   ├── tasks
│   │   │   ├── index.tsx
│   │   │   ├── styles.ts
│   │   │   ├── task-form.tsx
│   │   │   ├── column.tsx
│   │   │   └──  task-table.tsx
│   │   ├── tinymce
│   │   │   └── index.ts
│   │   ├── window-modal
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── layout.tsx
│   ├── hooks
│   │   └── useStore.ts
│   ├── store
│   │   ├── actions
│   │   │   └── projectActions.ts
│   │   ├── reducers
│   │   │   └── projectsReducer.ts
│   │   └── store.ts
│   ├── types.ts
│   ├── index.tsx
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └──  tsconfig.json
```

## What's Missing

Here are some areas where the app can be further improved:

### Data Sharing Across Devices: Database and Backend

- The app currently relies on local storage and Redux-persist, which means that data is not shared between different devices. To address this, consider implementing a database and a backend for synchronized data access.
- Introducing authentication and authorization would also be necessary for secure data management.
- The integration of a library like `redux-query` can help handle asynchronous actions efficiently.

### Additional Features: search and status

- Enhance the app by adding project status options, such as "active," "archived," and "completed," to provide better project management.
- Implement a search functionality to help users easily locate specific projects or tasks within the app.

### Bot Script 

To make the app more interactive, consider creating a bot script that can perform tasks like creating projects and adding tasks to demonstrate the app's functionality.



## Author

👤 **Zeyad Ajamy** [@zeyadajamy](https://github.com/zeyadAjamy)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to contribute to the improvement of this app
