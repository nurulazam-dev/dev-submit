# Dev Submit

Dev Submit is a full-stack submission-management platform for students to submit project work and for authorized reviewers to manage submissions.

## Table of Contents

- [Overview](#overview)
- [Objectives](#objectives)
- [Technology Stack](#technology-stack)
- [Roles](#roles)
- [Features](#features)
- [Submission Validation](#submission-validation)
- [Submission Workflow](#submission-workflow)
- [Frontend Structure](#frontend-structure)
- [Backend Structure](#backend-structure)
- [Data Model](#data-model)
- [API Overview](#api-overview)
- [Environment Variables](#environment-variables)
- [Installation and Setup](#installation-and-setup)
- [Development Commands](#development-commands)
- [Security Considerations](#security-considerations)
- [Development Guidelines](#development-guidelines)
- [Potential Improvements](#potential-improvements)
- [License](#license)

## Overview

**Project:** Dev Submit\
**Type:** Full-stack web application\
**Purpose:** Manage student project submissions, including project
descriptions, source-code repositories, live demos, and submission
status.

A submission contains fields such as `title`, `description`,
`githubUrl`, `liveUrl`, `studentId`, `status`, and `createdAt`. The
statuses visible in the frontend are `PENDING`, `APPROVED`, and
`REJECTED`. Confirm these values against the current database schema and
shared types.

## Objectives

- Give students a central place to submit project work.
- Save project descriptions, GitHub repository URLs, and live demo URLs.
- Let students view and search their own submissions.
- Support server-managed sorting, filtering, and pagination.
- Provide authorized reviewers with submission review capabilities.
- Validate data on both the client and server.
- Show clear loading, success, error, and empty states.

## Technology Stack

### Frontend

Technology Purpose

---

Next.js 16 App Router Application framework and routing
React 19 UI components
TypeScript Static typing
Tailwind CSS 4 Styling
TanStack Form Form state and submission
TanStack Query Server state, caching, mutations, and invalidation
TanStack Table Data-table functionality
Zod 4 Schema validation
Axios HTTP requests, where used in the service layer
shadcn/ui and Base UI Reusable UI components
lucide-react Icons
Sonner Toast notifications
Recharts Charts, where used in dashboard views

### Backend

---

Technology Purpose

---

Node.js JavaScript runtime

Express HTTP API

TypeScript Static typing

Prisma ORM Database access

PostgreSQL Relational database

Zod Request validation

tsx TypeScript development execution

express-rate-limit Rate limiting for sensitive
endpoints, where configured

---

The project was reported to use Prisma `8.0.0-rc.23` during development.
This is a release-candidate version;

## Roles

The backend context discussed so far includes these roles:

- **ADMIN** --- administrative access, including submission review
  operations.
- **STUDENT** --- student account access and management of the
  student's own submissions.

## Features

### Authentication

Authentication-related routes discussed during development include:

- Student registration
- Login
- Logout
- Current-user lookup (`GET /me`)
- Forgot-password flow

### Submission management

The submission form collects a title, description, GitHub URL, and live
URL. The backend associates the record with a student and manages its
status.

The frontend includes a `MySubmissionsTable` with:

- Server-managed search
- Server-managed sorting
- Server-managed pagination
- Status filtering
- Loading and fetching indicators
- Empty-state messaging
- A row action to view submission details
- A view-submission modal
- A toolbar action for the submission form

### Statuses

The frontend currently displays these statuses:

- `PENDING`
- `APPROVED`
- `REJECTED`

## Submission Validation

The Zod schema discussed for creating submissions applies the following
rules:

---

Field Rule

---

`title` Required, trimmed, 3--150
characters

`description` Required, trimmed, 10--1,000
characters

`githubUrl` Required valid URL; HTTPS GitHub
URL, optionally with `www`

`liveUrl` Required valid URL

---

## Submission Workflow

1.  A student signs in.
2.  The student opens the submission form.
3.  The form validates the title, description, GitHub URL, and live URL.
4.  The frontend sends the submission payload to the backend.
5.  The backend authenticates the requester and validates the payload.
6.  The service applies business rules and persists the submission
    through Prisma.
7.  The frontend refreshes the student's submission query.
8.  An authorized reviewer reviews the submission and updates its
    status.
9.  The student views the submission and its current status.

## Frontend Structure

The following is a **partial structure** based on the files referenced
during development, not a complete inventory of the repository:

```text
src/
├── actions/
│   └── submission.action.ts
├── components/
│   ├── shared/
│   │   ├── form/
│   │   │   ├── AppField.tsx
│   │   │   └── CustomSubmitButton.tsx
│   │   └── table/
│   │       ├── DataTable.tsx
│   │       ├── DataTableFilters.tsx
│   │       └── DataTablePagination.tsx
│   └── ...
├── hooks/
│   ├── useRowActionModalState.ts
│   ├── useServerManagedDataTable.ts
│   ├── useServerManagedDataTableFilters.ts
│   └── useServerManagedDataTableSearch.ts
├── services/
│   └── submission.services.ts
├── types/
│   ├── api.types.ts
│   └── submission.type.ts
└── zod/
    └── submission.validation.ts
```

### Data table and query caching

The reusable `DataTable` supports row data, column definitions, sorting,
pagination, search, filters, loading states, empty messages, toolbar
actions, and row actions.

The query key used for the student's submissions was:

```ts
["my-submissions", queryString];
```

After a successful mutation, invalidate the appropriate query key so the
table refreshes. Follow the project's shared query-key convention if one
exists.

The project was being migrated to TanStack Table v9. Verify table APIs
and type signatures against the exact installed version; do not assume
all v8 APIs are compatible.

## Backend Structure

The backend follows a modular Express pattern. This is a conceptual
outline based on the files and conventions discussed, not a verified
complete directory listing:

```text
src/
├── server.ts
├── app.ts
└── app/
    ├── config/
    ├── errorHelpers/
    ├── interfaces/
    ├── lib/
    ├── middleware/
    ├── module/
    │   ├── auth/
    │   ├── user/
    │   ├── submission/
    │   └── review/
    ├── routes/
    │   └── index.ts
    ├── shared/
    │   ├── catchAsync.ts
    │   └── sendResponse.ts
    └── utils/
```

Typical responsibilities:

- **Routes:** define endpoints and middleware order.
- **Controllers:** handle request/response concerns.
- **Services:** implement business rules and database operations.
- **Middleware:** authenticate users, authorize roles, validate input,
  and handle errors.
- **Shared utilities:** standardize asynchronous error handling and
  API responses.
- **Prisma:** define data models and access PostgreSQL.

## Data Model

The models referenced during development include `User`,
`Submission`, and `Review`. Confirm the exact current schema before
relying on this summary.

### User

Fields shown in the development schema included:

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
- `createdAt`

Email was configured as unique, with indexes for role and status.

### Submission

Fields discussed include:

- `id`
- `title`
- `description`
- `githubUrl`
- `liveUrl`
- `studentId`
- `status`
- `createdAt`

Verify relation names, defaults, indexes, and deletion behavior in the
current Prisma schema.

### Review

A `Review` model or relation was referenced, but its complete fields and
business rules have not been confirmed here.

## API Overview

Authentication endpoints explicitly discussed include:

---

Method Route Purpose

---

`POST` `/register` Register a student

`POST` `/login` Authenticate a user

`POST` `/logout` End the current session

`GET` `/me` Retrieve the
authenticated user

`POST` `/forget-password` Previously shown
forgot-password route;
verify spelling

---

The frontend also references `applySubmissionAction` and
`getMySubmissions`. The exact submission endpoint paths and HTTP methods
were not available in the discussed code, so they are not guessed here.
Add them from the current Express route files.

A typical request flow is:

1.  The UI invokes an action or service function.
2.  The request reaches an Express route.
3.  Authentication, authorization, and validation middleware run.
4.  The controller calls a service.
5.  The service applies business rules and queries Prisma.
6.  The API returns a consistent response.
7.  TanStack Query updates or invalidates cached data.

## Environment Variables

The exact environment variable names must match the project's
environment validation code. The following are examples only.

### Frontend `.env.local`

```dotenv
# Example only: use the name expected by the API client.
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend `.env`

```dotenv
# Examples only: verify names and required values in the backend config.
PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
JWT_SECRET=replace-with-a-strong-random-secret
```

Never commit actual credentials, database passwords, tokens, or secret
keys. Only expose `NEXT_PUBLIC_` variables that are safe for browser
access.

## Installation and Setup

### Prerequisites

- Node.js compatible with the repository's package configuration
- pnpm, if the repository uses pnpm
- PostgreSQL
- Git

### 1. Clone the repository

Use the actual repository URL and directory:

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

If frontend and backend are separate repositories, clone and configure
them separately.

### 2. Install dependencies

Run this in each project directory if pnpm is the package manager
specified by the lockfile:

```bash
pnpm install
```

Avoid mixing npm, Yarn, and pnpm in the same package directory.

### 3. Configure environment variables

Create the required environment files and fill in the variables expected
by the project's environment validation.

### 4. Configure PostgreSQL and Prisma

Set the database connection string and run the migration and generation
commands supported by the installed Prisma version. Because the project
used a Prisma 8 release candidate during development, verify the exact
CLI commands and configuration format against that version rather than
copying older-version instructions.

### 5. Start the backend

Use the scripts declared in the backend `package.json`. A typical
development script may be:

```bash
pnpm dev
```

### 6. Start the frontend

Use the scripts declared in the frontend `package.json`. A typical
development script may be:

```bash
pnpm dev
```

Open the local URL printed by Next.js.

## Development Commands

These are common examples; confirm that each script exists in the
relevant `package.json`.

Command Purpose

---

`pnpm dev` Start a development server
`pnpm build` Build for production
`pnpm start` Start the production build
`pnpm lint` Run lint checks
`pnpm exec tsc --noEmit` Run TypeScript checks

## Security Considerations

- Hash passwords with an appropriate password-hashing algorithm.
- Store password-reset OTPs as hashes and enforce expiration.
- Apply rate limits to login and password-reset endpoints.
- Check submission ownership on the backend.
- Restrict review operations to authorized roles.
- Validate user input on the server.
- Keep secrets in environment variables or a secrets manager.
- Use HTTPS in production.
- Avoid returning password hashes, OTP hashes, or stack traces to
  clients.
- Use database constraints and transactions where needed to protect
  important rules under concurrent requests.

## Development Guidelines

- Keep frontend and backend request/response types aligned.
- Treat client validation as a usability aid, not a security boundary.
- Keep query keys consistent and invalidate the correct queries after
  mutations.
- Use URL query parameters for shareable server-managed table state
  where appropriate.
- Verify TanStack Table APIs against the installed v9 package.
- Verify Prisma commands and generated imports against the installed
  version.
- Add tests for authentication, validation, submission ownership, and
  status transitions.

## Potential Improvements

Depending on the final requirements, consider:

- Automated tests for authentication and submission workflows.
- A dedicated reviewer dashboard.
- Submission detail pages and review history.
- Clear resubmission rules for rejected submissions.
- Notifications when submission status changes.
- API documentation with OpenAPI/Swagger.
- CI checks for linting, type checking, and tests.
- Deployment documentation for the frontend, API, and PostgreSQL.

## Contributing

1.  Create a feature branch.
2.  Keep changes focused and type-safe.
3.  Run available lint, type-check, and test commands.
4.  Document new environment variables and API routes.
5.  Open a pull request with a concise summary of the change.

## License

Add the project's chosen license before publishing the repository.
