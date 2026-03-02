# User Dashboard

A production-ready React frontend built with Vite, Axios, and Chakra UI that fetches users from a DummyJSON-style API and supports local user management operations.

## Tech Stack

- React (Vite)
- Axios
- Chakra UI
- Functional Components + React Hooks (`useState`, `useEffect`, `useMemo`)

## Features

- Fetch and display users from `https://dummyjson.com/users`
- Render selected fields only:
  - Full Name
  - Company Name
  - Role
  - Country
- Also displays extra fields:
  - Email
  - Phone
  - Age
- Refresh users with loading state and disabled refresh button while fetching
- Real-time, case-insensitive search by:
  - Name
  - Company name
  - Role
  - Country
- Add local user with `+` button and form fields (no API call)
- Delete user from local state only (no API call)
- Error message display for API failures
- Empty state when no users match search or list is empty
- Modular and maintainable folder structure

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Open Project Folder

```bash
cd d:\React
```

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to View Features

- User list loads automatically from the DummyJSON API.
- Use the search box to filter by name, company, role, country, email, phone, or age.
- Click `Refresh` to fetch the list again.
- Click `+` to open the add form, fill fields, then click `Add User`.
- Click `Delete` in any row to remove that row from local state.

## Folder Structure

```text
src/
+-- components/
¦   +-- Header.jsx
¦   +-- AddUserForm.jsx
¦   +-- SearchBar.jsx
¦   +-- UserRow.jsx
¦   +-- UserTable.jsx
+-- pages/
¦   +-- Dashboard.jsx
+-- services/
¦   +-- userService.js
+-- App.jsx
+-- index.css
+-- main.jsx
```

## Architecture Notes

- `src/services/userService.js`: Centralized API layer with Axios and error handling.
- `src/pages/Dashboard.jsx`: Owns UI state and behavior.
- `src/components/*`: Reusable presentational components.
- `useMemo` is used to optimize search filtering and avoid unnecessary recomputation on unrelated renders.

## API Format

Expected API response shape:

```json
{
  "users": []
}
```

Only `users` array is consumed by the app.

