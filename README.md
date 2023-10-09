# TODO-APP

## Description

This is a simple todo app that allows you to add, edit, and delete Projects. You can also add, edit, and delete tasks to each project. You can also mark tasks as queued, progress, or completed.

## Library Directory 📙

- React
- Redux
- React-Redux
- Redux-presist
- React-Router
- React-Icons
- React-dropzone
- TinyMCE

## Live Demo 🎥

[Live Demo Link](https://zeyadajamy.github.io/todo/)

## Screenshots 📷

![Mobile View](./todo-readme/mobile.png)

![Create New Project](./todo-readme/todo-create-project.png)

![Create New Task](./todo-readme/todo-mob-create-task.png)

![Mobile View: Projects](./todo-readme/todo-mob-projects.png)

![Mobile View: Tasks](./todo-readme/todo-tasks.png)

![Task Unfolded](./todo-readme/task%20unfolded.png)

## Getting Started 🚀

To get a local copy up and running follow these simple example steps.

### Prerequisites

- NodeJS
- NPM
- Git

### Setup

1. Clone the project locally.
2. Go to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the app.
5. Go to `http://localhost:3000/todo` to see the app in action.

### Project Structure

```
├── public
│   ├── index.html
│   └── favicon.ico
|   └── avatar.png
├── src
│   ├── assets  --> Lottie animations
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

## Author

👤 **Zeyad Ajamy**

- GitHub: [@zeyadajamy](https://github.com/zeyadAjamy)
