# Dev Submit

A full-stack project submission and review platform where students can submit their projects and administrators can review submissions and provide feedback.

> **Documentation status:** This README is based on the project details shared during development conversations. Some implementation details, such as exact environment variable names, API response envelopes, deployment configuration, and complete database schema, have not been independently verified. Update the marked sections to match the current source code before publishing.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Core Goals](#core-goals)
- [Technology Stack](#technology-stack)
- [User Roles](#user-roles)
- [Main Features](#main-features)
- [Submission Workflow](#submission-workflow)
- [Review Workflow](#review-workflow)
- [Dashboard and Statistics](#dashboard-and-statistics)
- [Project Architecture](#project-architecture)
- [Backend](#backend)
- [Frontend](#frontend)
- [Data Model](#data-model)
- [Authentication and Authorization](#authentication-and-authorization)
- [Validation and Error Handling](#validation-and-error-handling)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Development Commands](#development-commands)
- [Build and Deployment](#build-and-deployment)
- [Security Considerations](#security-considerations)
- [Known Implementation Notes](#known-implementation-notes)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

**Dev Submit** is a project submission and evaluation platform. It provides a structured workflow for students to submit their development projects and for administrators to review those submissions.

Students can provide project information, including a title, description, GitHub repository URL, and live deployment URL. Administrators can inspect submissions, write feedback, and manage review status.

The platform separates student-facing submission functionality from administrator-facing review and management functionality.

## Core Goals

- Provide students with a consistent place to submit project work.
- Store project details and repository/demo links.
- Prevent a student from creating another submission while they already have a pending submission, according to the stated business rule.
- Allow administrators to review student work and provide feedback.
- Maintain a clear submission and review status.
- Provide role-specific dashboard statistics.

## Technology Stack

The following technologies have been identified from the project implementation and development discussions.

### Frontend

| Technology              | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| Next.js 16 (App Router) | React framework and application routing       |
| React 19                | UI rendering                                  |
| TypeScript 5            | Static typing                                 |
| Tailwind CSS 4          | Styling                                       |
| TanStack Query v5       | Server-state fetching, caching, and mutations |
| TanStack Form           | Form state and submission handling            |
| TanStack Table          | Data table functionality                      |
| Zod 4                   | Runtime validation                            |
| Axios                   | HTTP requests                                 |
| shadcn/ui and Base UI   | UI components                                 |
| lucide-react            | Icons                                         |
| Recharts                | Dashboard charts                              |
| Sonner                  | Toast notifications                           |
| next-themes             | Theme management                              |
| pnpm                    | Package management                            |

### Backend

| Technology         | Purpose                               |
| ------------------ | ------------------------------------- |
| Node.js            | JavaScript runtime                    |
| Express.js         | HTTP API framework                    |
| TypeScript         | Static typing                         |
| Prisma ORM 8 RC    | Database access and schema management |
| PostgreSQL         | Relational database                   |
| Zod                | Request validation                    |
| express-rate-limit | Rate limiting for sensitive endpoints |
| tsx                | TypeScript development execution      |
| tsup               | Backend bundling                      |

> Check the current `package.json` files to confirm exact package versions. Prisma 8 was discussed as a release candidate during development, so the exact installed version may differ.

---

## User Roles

The known application roles are:

### STUDENT

A student can:

- Register and log in.
- View their own profile/current authenticated user.
- Create a project submission when allowed by the submission rules.
- View their own submissions.
- Track submission status.
- Read administrator feedback when a review is available.

### ADMIN

An administrator can:

- Access the administrative dashboard.
- View users and submissions.
- Inspect an individual submission.
- Add feedback to a submission.
- Manage review status.
- View platform statistics.

The backend authentication payload has been described with these fields:

| Field    | Description             |
| -------- | ----------------------- |
| `userId` | Authenticated user's ID |
| `email`  | User email              |
| `name`   | User name               |
| `phone`  | User phone number       |
| `role`   | `ADMIN` or `STUDENT`    |
| `status` | `ACTIVE` or `BLOCKED`   |

---

## Main Features

### 1. Authentication

The backend authentication routes discussed for the project include:

- Student registration
- Login
- Logout
- Current-user endpoint (`/me`)
- Forgot-password flow

The current-user endpoint is protected for authenticated `ADMIN` and `STUDENT` users.

**Implementation note:** The previously shared route name for the forgot-password endpoint was `/forger-password`. Confirm whether this spelling is intentional or whether the route should be renamed consistently across frontend and backend.

### 2. Student Submission Management

A submission contains the project information needed for evaluation:

- Project title
- Project description
- GitHub repository URL
- Live project URL
- Submission status
- Student relationship
- Creation/update timestamps, if defined in the current schema

The student-facing submission list is designed to support:

- Search
- Status filtering
- Sorting
- Pagination
- Viewing submission details

The frontend query key used for the student's submission list is:

```ts
["my-submissions", queryString];
```

### 3. Administrator Review

Administrators can open a submission and submit feedback.

The intended business rule is:

- One submission can have one review.
- The application checks whether a review already exists before creating another one.
- The administrator who creates the review is associated with the review record.
- Review status can be updated.

The exact review fields and allowed status values should be confirmed from the current Prisma schema.

### 4. Dashboard

The dashboard displays role-specific statistics.

The discussed administrator statistics include:

- Total users
- Total administrators
- Total students
- Total submissions
- Pending submissions
- Approved submissions
- Rejected submissions
- Total reviews
- Monthly requests/submissions

The discussed student statistics include:

- Total submissions belonging to the student
- Their pending submissions
- Their approved submissions
- Their rejected submissions

---

## Submission Workflow

1. A student logs in.
2. The frontend obtains the authenticated user's identity through the authentication flow.
3. The student opens the submission form.
4. The student enters the project title, description, GitHub URL, and live URL.
5. The frontend validates the form.
6. The backend validates the request and identifies the student from the authenticated request.
7. The backend checks whether that student already has a pending submission.
8. If a pending submission exists, the backend rejects the new submission according to the business rule.
9. Otherwise, the backend creates a submission with `PENDING` status.
10. The student can view the submission in the My Submissions page.

### Submission validation

The shared Zod schema specifies these constraints:

| Field         | Validation                                            |
| ------------- | ----------------------------------------------------- |
| `title`       | Required, trimmed, 3–150 characters                   |
| `description` | Required, trimmed, 10–1000 characters                 |
| `githubUrl`   | Required URL matching a GitHub repository URL pattern |
| `liveUrl`     | Required valid URL                                    |

Example schema:

```ts
export const createSubmissionZodSchema = z.object({
  title: z
    .string("Title is required")
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must not exceed 150 characters"),

  description: z
    .string("Description is required")
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),

  githubUrl: z
    .string("GitHub URL is required")
    .trim()
    .url("Invalid URL")
    .regex(
      /^https:\/\/(www\.)?github\.com\/.+/,
      "Must be a valid GitHub URL (e.g. https://github.com/username/repo)",
    ),

  liveUrl: z
    .string("Live URL is required")
    .trim()
    .url("Invalid Live URL (e.g. https://my-project.vercel.app)"),
});
```

The schema above validates the student-provided project fields. The authenticated student's ID should be derived and verified on the server, not trusted from a client-submitted form field.

---

## Review Workflow

1. An administrator opens the submissions list.
2. The administrator selects a submission.
3. The submission details are displayed.
4. The administrator chooses the add-feedback action.
5. The administrator submits feedback.
6. The backend checks whether a review already exists for the submission.
7. If no review exists, the backend creates the review and associates it with the submission and administrator.
8. The administrator can update the review status according to the allowed workflow.
9. The student can view the review/feedback associated with their submission.

**Important data integrity rule:** Enforce one review per submission with a database-level unique constraint on the review's submission foreign key, in addition to the service-level existence check. A check followed by a create operation alone can be vulnerable to concurrent requests.

---

## Dashboard and Statistics

Dashboard statistics should be calculated on the backend according to the authenticated user's role.

Conceptually:

```ts
switch (user.role) {
  case "ADMIN":
    // Return platform-wide statistics.
    break;

  case "STUDENT":
    // Return statistics scoped to the authenticated student.
    break;
}
```

Student statistics must be scoped using the authenticated user's ID. An administrator's statistics may cover the whole platform, subject to authorization.

---

## Project Architecture

The project is split into a frontend application and a backend API.

```text
dev-submit/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── actions/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── ...
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── app.ts
    │   ├── server.ts
    │   ├── modules/
    │   ├── middlewares/
    │   ├── routes/
    │   ├── utils/
    │   └── ...
    ├── prisma/
    ├── package.json
    └── tsconfig.json
```

> This is a conceptual layout based on the files and folders discussed. It is not a verified, exhaustive directory listing. Keep the actual repository structure as the source of truth.

---

## Backend

### Responsibilities

The backend is responsible for:

- Authentication and authorization
- User registration and login
- Submission creation and retrieval
- Review creation and status management
- Dashboard statistics
- Database operations
- Request validation
- Rate limiting and error handling

### Known API route concepts

The following route concepts have been discussed. Confirm exact HTTP methods, prefixes, and route names in the current Express router.

| Feature              | Route concept                                | Access               |
| -------------------- | -------------------------------------------- | -------------------- |
| Register             | `/auth/register`                             | Public               |
| Login                | `/auth/login`                                | Public, rate limited |
| Logout               | `/auth/logout`                               | Authenticated        |
| Current user         | `/auth/me`                                   | Admin or Student     |
| Forgot password      | Previously shared as `/auth/forget-password` | Public, rate limited |
| Create submission    | Submission create endpoint                   | Student              |
| My submissions       | Student submissions endpoint                 | Student              |
| List submissions     | Admin submissions endpoint                   | Admin                |
| Create review        | Review create endpoint                       | Admin                |
| Update review        | Review update endpoint                       | Admin                |
| Dashboard statistics | Dashboard endpoint                           | Role-dependent       |

The table intentionally avoids inventing exact submission/review paths and HTTP methods that have not been confirmed.

### Authenticated user identity

The backend request user type has been described as:

```ts
export interface IRequestUser {
  userId: string;
  role: UserRole;
  email: string;
}
```

The authenticated identity should be read from the verified request context, for example:

```ts
const studentId = req.user?.userId;
```

Do not use `req.user?.id` when the actual authentication payload exposes `userId`.

### Suggested backend module boundaries

A modular Express structure can separate:

- `auth`: registration, login, logout, current user, password recovery
- `user`: user management and user queries
- `submission`: submission creation and submission queries
- `review`: feedback and review status
- `dashboard`: role-specific aggregate statistics

Use the project's actual module names and conventions when implementing these boundaries.

---

## Frontend

### Responsibilities

The frontend is responsible for:

- Student and administrator interfaces
- Forms and client-side validation
- Calling backend services
- Managing server state and cache
- Search, filtering, sorting, and pagination
- Displaying submission and review details
- Showing dashboard statistics
- Providing loading, empty, success, and error states

### Next.js App Router

The application uses the Next.js App Router. Server Components can fetch initial data, while Client Components handle interactive tables, forms, modals, and mutations.

### TanStack Query

TanStack Query is used for caching and synchronizing server data.

Example query key used for the student's submission list:

```ts
["my-submissions", queryString];
```

After a successful submission mutation, invalidate the relevant query so the table can refresh:

```ts
queryClient.invalidateQueries({
  queryKey: ["my-submissions"],
});
```

### Server Actions

The project includes a submission Server Action at:

```text
src/actions/submission.action.ts
```

A development log has shown `createSubmissionAction` being invoked. This confirms that the action was executed, but the log alone does not prove that the backend persisted the submission successfully. Check the action's returned result and backend response.

### TanStack Form and Zod

Use field-level validation when the form's full value object contains fields that are not part of the shared project-field Zod schema. For example, `studentId` should not be added to the student-input schema merely to satisfy the form's type.

The server must still validate all untrusted input.

---

## Data Model

The project has discussed the following core entities.

### User

Known fields include:

- `id`
- `name`
- `email`
- `password`
- `role`
- `status`
- `phone`
- `address`
- `passwordChangedAt`
- `resetOtpHash`
- `resetOtpExpiresAt`
- Submission relationship
- Review relationship
- `createdAt`

Known role values:

- `ADMIN`
- `STUDENT`

Known account status values:

- `ACTIVE`
- `BLOCKED`

### Submission

Known fields include:

- `id`
- `title`
- `description`
- `githubUrl`
- `liveUrl`
- `status`
- `studentId`
- Student relationship
- Optional review relationship
- Timestamps, if present in the current schema

Known submission statuses discussed:

- `PENDING`
- `APPROVED`
- `REJECTED`

### Review

The review entity is associated with a submission and an administrator/reviewer. Feedback text and review status have been discussed. A status value `COMPLETED` appeared in a previously shared example.

The complete Review schema, exact status enum, relation names, and timestamp fields should be copied from the current Prisma schema before treating this section as a definitive schema reference.

### Relationship overview

```text
User (Student)
   |
   | one-to-many
   v
Submission
   |
   | zero-or-one review (intended business rule)
   v
Review
   |
   | created by
   v
User (Admin)
```

The exact cardinality and relation field names must match the Prisma schema. The intended rule is one review per submission.

---

## Authentication and Authorization

- Public routes should be limited to operations such as registration and login.
- Protected routes should require a valid authentication credential.
- Role checks should restrict administrative operations to `ADMIN`.
- Student operations should be scoped to the authenticated student.
- The `/me` endpoint should return the current authenticated user.
- The frontend may use the current-user endpoint to obtain the student's ID for display or UI logic.
- The backend must derive the authoritative student ID from the verified authentication context.

Never treat a client-provided `studentId` as authorization.

---

## Validation and Error Handling

Recommended validation layers:

1. **Frontend validation:** Provide immediate feedback to users.
2. **Backend request validation:** Validate all incoming data again on the server.
3. **Database constraints:** Protect uniqueness and relational integrity.
4. **Consistent error responses:** Return useful messages without exposing secrets or internal stack traces.

Important constraints to enforce:

- Unique user email.
- A student cannot create another submission while their own submission is pending, according to the current business rule.
- One review per submission.
- Only authorized administrators can create or update reviews.
- Students can only access their own submissions and associated feedback.

### Submission concurrency

A service-level sequence such as “find pending submission, then create” can allow two simultaneous requests to pass the check before either creates a record. Consider a transaction and an appropriate database-level strategy for the actual business rule. A simple unique constraint on `studentId` would also prevent multiple historical submissions, so it should only be used if that is the intended permanent rule. The correct database design depends on whether students may submit again after approval or rejection.

---

## Getting Started

The exact repository folder names and scripts should be checked in the current project. The following is a general setup outline.

### Prerequisites

- Node.js version compatible with the project's package configuration
- pnpm
- PostgreSQL database
- Access to the project repository

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd dev-submit
```

### 2. Install dependencies

Install dependencies in each application directory:

```bash
cd backend
pnpm install
```

Then:

```bash
cd ../frontend
pnpm install
```

### 3. Configure environment variables

Create the required `.env` files based on the environment variables actually read by each application. See [Environment Configuration](#environment-configuration).

### 4. Prepare the database

Configure the PostgreSQL connection string, then run the database commands supported by the installed Prisma 8 RC version and the project's scripts.

Do not assume Prisma 7 commands or generated-client paths apply unchanged to this Prisma 8 RC project. Check the installed CLI's help and the project's `package.json` scripts.

### 5. Start the backend

Use the backend development script listed in its `package.json`. A previously shared script was:

```bash
pnpm dev
```

### 6. Start the frontend

Use the frontend development script listed in its `package.json`, commonly:

```bash
pnpm dev
```

Open the local frontend URL printed by the Next.js development server.

---

## Environment Configuration

The exact environment variable names have not been fully confirmed from the source files. The following are categories of configuration the application is expected to need; use the exact names required by the code.

### Backend configuration

| Variable purpose          | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| Database URL              | PostgreSQL connection string                                 |
| Authentication secret/key | Used to sign or verify authentication tokens, if JWT is used |
| Server port               | Backend HTTP port                                            |
| Frontend origin           | Allowed frontend origin for CORS                             |
| Email configuration       | Needed if password recovery sends email                      |
| Other service credentials | Only if the current backend integrates external services     |

### Frontend configuration

| Variable purpose     | Description                                         |
| -------------------- | --------------------------------------------------- |
| Backend API base URL | URL used by Axios/services to reach the backend     |
| Public app URL       | Used where the frontend needs its own canonical URL |

Do not commit real secrets or production credentials. Add `.env` files to `.gitignore` and provide a safe `.env.example` containing placeholder values only.

---

## Development Commands

Commands must match the current `package.json` scripts. Previously discussed backend scripts included:

```bash
pnpm dev
pnpm build
pnpm start
```

A previously shared backend build pipeline included Prisma contract generation, TypeScript checking/compilation, and tsup bundling. The exact current scripts have changed during development, so inspect `backend/package.json` before relying on a specific command.

For the frontend, inspect `frontend/package.json` for the available scripts. Typical Next.js scripts may include:

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

Only run scripts that are actually defined in the relevant package file.

---

## Build and Deployment

The project has been prepared for deployment with Vercel in prior development work. The backend deployment configuration has included a `vercel.json` using a Node function.

Before deploying:

1. Confirm the frontend and backend build successfully locally.
2. Confirm the production database is reachable from the deployment environment.
3. Configure production environment variables in the hosting dashboard.
4. Confirm the backend entry point matches the actual build output.
5. Confirm ESM/CommonJS settings are consistent across `tsconfig`, `package.json`, and the bundler output.
6. Confirm CORS allows the deployed frontend origin.
7. Run authentication, submission, and review smoke tests against the deployed API.

A previously encountered backend startup error was:

```text
SyntaxError: Cannot use import statement outside a module
```

This indicates a possible mismatch between the emitted JavaScript module format and Node's interpretation of the output. Verify the generated entry point, package `"type"`, TypeScript module settings, and tsup output format together. Do not assume that a successful TypeScript build guarantees the deployed Node entry point will run.

---

## Security Considerations

- Hash passwords before storing them.
- Never expose password hashes, reset OTP hashes, secrets, or tokens in API responses.
- Use HTTPS in production.
- Apply rate limiting to login and password recovery endpoints.
- Validate request bodies on the backend.
- Enforce role-based authorization on protected routes.
- Derive student identity from the verified authentication context.
- Restrict students to their own submissions and reviews.
- Enforce review uniqueness at the database level.
- Use secure cookie settings if authentication is cookie-based.
- Avoid logging credentials, tokens, or sensitive personal information.
- Keep dependencies and runtime versions updated.

---

## Known Implementation Notes

These notes reflect issues or decisions discussed during development. They are not assertions that every issue remains present in the latest code.

1. **Prisma 8 RC:** The project has used Prisma 8 release-candidate packages. Generated contract/type access differs from earlier Prisma workflows. Follow the installed version's actual generated output.
2. **Contract-based role type:** A `UserRole` type has been derived from the generated Prisma contract rather than assuming an older generated enum export path.
3. **Authenticated user field:** The backend auth payload uses `userId`. Use that property rather than assuming `req.user.id`.
4. **Submission ownership:** The backend should determine the student from the authenticated request.
5. **Pending submission rule:** The pending-submission check must be scoped to the current student, not all students.
6. **Review uniqueness:** One submission should have one review. A database constraint is important for concurrent requests.
7. **TanStack Form validation:** The shared submission schema validates project fields, not the authenticated student's ID. Avoid forcing unrelated fields into that schema.
8. **Vercel module output:** Check the actual generated backend entry file and module format before deployment.
9. **Prisma timestamp runtime:** A previous runtime log reported a missing global Temporal implementation for a PostgreSQL timestamp codec. Verify the current runtime and Prisma/driver configuration if that issue appears again.
10. **Dashboard numeric types:** A previous Prisma 8 type issue involved count results represented as `IncludeScalar<number>`. Use the current generated types and supported conversion strategy rather than assuming ordinary `number` values.

---

## Future Improvements

Potential improvements, subject to product requirements:

- Email verification
- Password reset OTP expiry and retry controls
- Submission edit/resubmission rules
- Review history or audit log
- Notifications when a review is published
- More detailed administrator filters
- Dashboard charts and date-range reports
- Automated tests for submission and review business rules
- API documentation using OpenAPI/Swagger
- CI checks for type errors, linting, and tests
- Structured logging and production monitoring

---

## Contributing

1. Create a feature branch.
2. Keep changes focused on the relevant module.
3. Follow existing naming and folder conventions.
4. Validate incoming data on the backend.
5. Add or update tests for business rules.
6. Run the available type-check, lint, and build scripts.
7. Submit a pull request with a clear description of the change.

---

## License

No license information has been confirmed. Add the appropriate license before making the repository public.
