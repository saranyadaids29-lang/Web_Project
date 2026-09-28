# Student Academic Report Card Portal

A responsive React portal for students to view their semester results and for administrators to maintain student records and marks. The project uses React, React Router DOM, Vite, local sample data, and browser localStorage.

## Run Locally

From the project root:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). Create a production build with `npm run build`; run the linter with `npm run lint`.

React Router DOM is already declared in `package.json`. For a fresh copy, `npm install` installs React, React DOM, React Router DOM, Vite, and the configured development tools.

## Sample Sign-ins

- Admin: `admin` / `admin123`
- Student: `23AD001` / `19-12-2007`
- Other student records: `23AD002` / `02-11-2006`, `23CS014` / `21-04-2006`

These credentials are demonstration data only. Student sign-in uses the register number and date of birth stored with that student's record. The `23AD001` sample shows the semester course, credit, grade, and result data supplied for this report.

## Features

Students can view their dashboard, subject-wise Semester 1 and Semester 2 marks, computed totals, percentage, subject grades, pass/fail status, and the full report card. A student page always looks up the current session's register number; there is no student-controlled register-number route parameter.

Administrators can search by name or register number, inspect individual report cards, add/edit/delete students, and add or update subject marks and CGPA in either semester. Totals, percentages, grades, and pass/fail are derived from the saved subject marks. Changes are stored in localStorage and remain on the same browser until its site data is cleared.

## Routes

- `/login` — sign-in for both roles.
- `/admin` — administration overview and searchable student table.
- `/admin/students` — full student directory.
- `/admin/students/new` — add a student and semester data.
- `/admin/student/:registerNumber` — administrator's view of one report.
- `/admin/student/:registerNumber/edit` — edit student details and marks.
- `/student` — current student's result summary.
- `/student/semester/1` and `/student/semester/2` — semester reports.
- `/student/report` — current student's full report.

`ProtectedRoute` checks the role before rendering nested routes and sends signed-out users to `/login`. A logged-in user of the wrong role is redirected to their own dashboard. `BrowserRouter` maps URLs to page components without a full page reload.

## React State and Authentication

`AuthContext` owns the student list, logged-in user, loading state, login/logout actions, and student mutations. React `useState` controls these values as well as form inputs, search text, submission state, and validation errors. `useEffect` restores the session and student data on startup, then persists updates to localStorage. `Login` validates credentials against the sample data. `StudentDashboard`, `SemesterResult`, and `StudentReport` select the record using the authenticated user's register number, so changing a URL cannot select another student's results.

## Project Map

- `src/main.jsx` mounts the app inside `BrowserRouter` and `AuthProvider`.
- `src/App.jsx` declares routes and role-protected route groups.
- `src/context/AuthContext.jsx` manages authentication, records, and localStorage persistence.
- `src/data/students.js` contains sample data plus shared grade and semester-summary helpers.
- `src/components/` contains navigation, route guard, loading state, student table, and report card.
- `src/pages/` contains login, student and admin dashboards, semester/full report pages, directory, and editor.
- `src/index.css` and `src/App.css` define responsive portal styling.

## Connect a Real Backend

Replace the localStorage functions in `AuthContext` with API calls to a server and load student data from a database. The server should verify credentials, issue a secure session (preferably an HttpOnly, Secure, SameSite cookie), and authorize every student/admin request. Enforce ownership on the server using the authenticated account, not a register number supplied by the browser. Store password hashes rather than dates of birth or plaintext passwords, use HTTPS, validate and audit administrator changes, and return only the records allowed for that role.

**Security note:** this is a frontend-only educational demo. Credentials and records are shipped to the browser, and localStorage can be inspected or edited by the user. React protected routes only control the interface; they do not secure data. Do not use this implementation for real student records without backend authentication and authorization.
