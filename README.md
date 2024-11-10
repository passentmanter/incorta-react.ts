# Incorta React TypeScript Project

## Overview

This is a React application built using TypeScript. It aims to showcase a modular and reusable component architecture, leveraging React's functional components and TypeScript's strong typing. The project is set up with **Create React App** and uses **Tailwind CSS** for styling.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/get-npm)

## Setup and Installation

1. Clone the repository:

```bash
 git clone https://github.com/yourusername/yourproject.git
```

2. Navigate to the project folder:

```bash
cd incorta-react.ts
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

The app will run on http://localhost:3000.

## Project Structure

- **src/components**: Contains reusable components like loader, pagination, etc.
- **src/pages**: Organizes page-level components for main sections such as Seasons, Races, and Race Details.
- **src/services**: Manages API calls to the Ergast API.
- **src/context**: Implements global state management for features like pinning races.
- **src/types**: Contains all types declaration (interfaces) of the project.
- **public**: Contains static files.

## Technical Approach and Architectural Decisions

This project leverages **React** with **TypeScript** to ensure type safety and maintainable code. Functional components and hooks (such as `useState` and `useEffect`) are used for state management and side effects. **Tailwind CSS** is integrated for styling, allowing a utility-first approach that makes it easy to create responsive and customizable UIs.

1. ### Key Technologies

- **React**: For building the UI components.
- **TypeScript**: Adds type safety to JavaScript, preventing potential errors and improving code quality.
- **Tailwind CSS**: A utility-first CSS framework is used to speed up development and reduce custom CSS, focusing on consistency and maintainability across the application.
- **PrimeReact**: A UI component library providing a wide range of customizable and accessible components, improving user experience with advanced features.


2. ### Data Fetching and API Handling

- **API Integration**: The app uses the Ergast API to fetch Formula 1 data, including seasons, races, and driver details. Each API call is handled through a service layer (src/services) to keep the code organized and improve testability.
- **Error Handling**: Loading states and error messages are implemented for a smoother user experience during data fetching.

3. ### State Management

- **Global State with Context API**: A centralized state management solution, such as React Context, was used to handle global state, including pinned races. This approach simplifies state sharing across components without prop drilling.
- **Pinning Races**: Pinned races persist across page refreshes using local storage, ensuring that user preferences are maintained.

4. ### Routing

- **React Router**: The app uses React Router to navigate seamlessly between seasons, races, and race details, ensuring a fluid experience as users drill down into different data points.

5. ### User Interface & Styling

- **Responsive Design**: The UI is designed to be responsive, using Flexbox to ensure compatibility across different screen sizes.
- **List and Card View Toggles**: Users can toggle between list and card views for better usability. This toggle option is implemented with React state management and conditional rendering.

6. ### Testing

- **Unit Tests**: Jest and React Testing Library were used for unit testing of critical components and business logic.
- **E2E Tests**: End-to-end tests can be added using Cypress for additional test coverage.

## API Endpoints

- **Seasons**: /api/f1/seasons.json
- **Races for a Season**: /api/f1/{season}/races.json
- **Race Results**: /api/f1/{season}/{round}/results.json

## Features

- **Season Listing with Pagination and toggle view**: Lists all seasons, with pagination for easier navigation through extensive lists and toggle for improved usability.
- **Race Listing for Selected Season**: Fetches races for a chosen season and allows users to pin favorite races and show them at the top of the list without losing pined list in refresh.
- **Race Details**: Displays participating drivers with search by name to highlight specific drivers.
- **Race chart**: Displays a comparison between drivers on the time they finished the race as default view for the chart.
- **compare between derivers**: Ability for comparing between any two competitors with selection of Comparison points.
- **Multiple bar chart**: Displays a comparison between all drivers in main three criteria (points, laps and grid).

## Web Performance Analysis

| Metric | Score |
| - | - |
| `Performance` | 100% |
| `Accessibility` | 80% |
| `Best Practices	` | 93% |
| `SEO` | 100% |

![Screenshot 2024-11-10 191129](https://github.com/user-attachments/assets/befeb6ad-53d4-4ccc-af1b-b710a09110d5)


## License

This project is licensed under the MIT License.
