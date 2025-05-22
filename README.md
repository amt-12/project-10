# Project Management Application

This is a React-based project management application that allows users to manage team projects efficiently. The application provides features to create, view, and manage projects with details such as project name, description, start and due dates, and status.

## Features

- View a list of projects with project cards.
- Create new projects using a modal form with validation.
- Manage project details including name, description, start date, due date, and status.
- Responsive UI built with Tailwind CSS and Ant Design components.
- Form validation using Joi schema.
- API integration for fetching and managing projects.

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Ant Design for UI components (Modal, message)
- Joi for form validation
- React Router for navigation
- Lucide React for icons
- Vite as the build tool

## Project Structure

- `src/views/`: Contains the main views such as ProjectsView, CreateProjectView, EditProjectView, and ProjectDetailView.
- `src/components/`: Reusable UI components including project-related components like ProjectCard, ProjectForm, TeamMemberForm, and UI elements like Button, Card, Badge, Skeleton.
- `src/services/`: API service functions.
- `src/types/`: TypeScript type definitions.
- `src/utils/`: Utility functions.

## Setup and Running

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite).

## Notes

- The "New Project" button opens a modal form for creating projects with validation rules enforced by Joi.
- Ensure that the dependencies `antd` and `joi` are installed for the modal and validation to work correctly:

```bash
npm install antd joi
```

- The project uses Tailwind CSS for styling; ensure your environment supports PostCSS and Tailwind configuration.

## License

This project is open source and available under the MIT License.
