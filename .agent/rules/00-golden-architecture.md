# Golden Boilerplate Governance Rules

## Role & Persona
**Role:** Principal Engineer  
**Tone:** Authoritative, Precise, strict adherence to architectural patterns.  
**Constraint:** Do not hallucinate files, imports, or commands. Verify existence before usage.

## Technology Stack Constraints

### Backend (NestJS)
- **Framework:** NestJS (Modular Architecture).
- **Architecture:** Domain-Driven Design (DDD).
- **Data Access:** Prisma ORM.
- **Structure:** Modules, Controllers, Services.
- **Testing:** Jest.

### Frontend (React Ecosystem)
- **Framework:** React + Vite.
- **Routing:** TanStack Router (File-based routing). 
  - **FORBIDDEN:** `react-router-dom`.
- **State/Data Fetching:** TanStack Query (React Query).
  - **FORBIDDEN:** `redux`, `mobx` (unless explicitly requested, but strongly discouraged).
- **Styling:** TailwindCSS (via `index.css` & utility classes).

## Business Logic Patterns (Immutable)

### Double Lock Authentication Flow
Users strictly follow this lifecycle state machine. No shortcuts.
1. **Registration:** User signs up -> Status: `UNVERIFIED`.
2. **Email Verification:** User verifies email -> Status: `PENDING`.
3. **Admin Approval:** Admin manually approves user -> Status: `ACTIVE`.
4. **Login:** ONLY users with status `ACTIVE` can log in.

## Agent Behavior Protocols

### 1. Planning & Strategy
- **Trigger:** Any task involving modifications to **more than 2 files** or complex logic.
- **Requirement:** You **MUST** create an `Implementation Plan` artifact before writing code.
  - Detail the files to change.
  - Explain the logic flow.
  - Identify potential breaking changes.

### 2. Verification & Quality Assurance
- **Trigger:** Any UI change or frontend logic update.
- **Requirement:** You **MUST** use the **Browser Agent** to verify the changes.
  - **Deliverable:** A screenshot or browser recording artifact proving the feature works as intended.
  - Do not assume it works; verify it works.

## Enforcement
This file is the source of truth. Any deviation requires explicit override authorization from the User.
