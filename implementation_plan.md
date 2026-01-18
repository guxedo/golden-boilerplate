# implementation_plan.md

## Feature: Personal Notes (CRUD)

This Implementation Plan describes the creation of a "Personal Notes" feature following the **Golden Boilerplate** strict architecture.

---

### 1. Database & Schema
> **Governing Skill:** `database-prisma` (`prisma-expert`)

We need to add a `Note` model to the schema.
*   **Schema Changes** (`apps/api/prisma/schema.prisma`):
    ```prisma
    model Note {
      id        String   @id @default(uuid())
      title     String
      content   String   @db.Text
      userId    String
      user      User     @relation(fields: [userId], references: [id])
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt

      @@index([userId])
    }
    ```
*   **Rules Enforcement**:
    *   Must run `npx prisma migrate dev --name add_note_model` (No manual SQL).
    *   Must run `npx prisma generate` after schema changes.

---

### 2. Backend Implementation (NestJS)
> **Governing Skill:** `nestjs-ddd` (`nestjs-ddd-expert`)

We will scaffold a vertical slice module `apps/api/src/modules/notes`.

#### Architecture Layers
1.  **Domain Entity** (`note.entity.ts`):
    *   Pure TypeScript class representing the Note.
    *   Factory method `Note.restore(props)` to map from Prisma result.
2.  **Repository** (`note.repository.ts`):
    *   **Rule:** This is the *only* place `PrismaService` is injected.
    *   Methods: `create`, `findById`, `findAllByUserId`, `update`, `delete`.
    *   Returns `Promise<Note>` (Domain Entity), not Prisma type.
3.  **Service** (`notes.service.ts`):
    *   Injects `NoteRepository`.
    *   **Business Logic (Double Lock)**:
        *   Check `User.status`. If `UNVERIFIED` or `PENDING`, throw `ForbiddenException`. Only `ACTIVE` users can create/edit notes.
4.  **Controller** (`notes.controller.ts`):
    *   Endpoints:
        *   `POST /notes`
        *   `GET /notes`
        *   `GET /notes/:id`
        *   `PATCH /notes/:id`
        *   `DELETE /notes/:id`
    *   Details: Uses `RequestWithUser` to get `userId`.
5.  **DTOs**:
    *   `CreateNoteDto` (title: string, content: string).
    *   Uses `class-validator` (@IsString, @IsNotEmpty).

---

### 3. Frontend Implementation (React)
> **Governing Skill:** `react-shadcn` (`react-shadcn-ui`)

We will create the UI in `apps/web`.

#### Routing & Pages
*   **Route:** `/notes` (File-based route).
*   **Layout:** Wrapped in the Dashboard Layout (Authenticated).

#### Data Fetching
*   **Library:** `@tanstack/react-query`.
*   **Queries:** `useQuery(['notes'], fetchNotes)`.
*   **Mutations:** `useMutation(createNote, { onSuccess: invalidate 'notes' })`.
*   **API Client:** Use `@/lib/api` (Axios) for all requests.

#### Components
*   **List View:** Grid of cards using `@/components/ui/card`.
*   **Create/Edit:** Dialog using `@/components/ui/dialog` and `zod` form validation (`react-hook-form`).
*   **Icons:** Import from `lucide-react` (e.g., `Notebook`, `Plus`, `Trash`).

---

### 4. Quality & Testing
> **Governing Skill:** `testing-quality`

*   **Backend (`notes.service.spec.ts`):**
    *   Mock `NoteRepository`.
    *   Test case: "Should throw if user is not ACTIVE".
    *   Test case: "Should create note if user is ACTIVE".
*   **Frontend (`NotesPage.test.tsx`):**
    *   Smoke test: Ensure "Create Note" button renders.
