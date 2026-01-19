# qa/notes-test-plan.md

## Test Plan: Personal Notes

**Feature:** Management of personal notes (Create, List, Delete) with ownership security.
**Target Service:** `apps/api/src/notes/notes.service.ts`
**Test File:** `apps/api/src/notes/notes.service.spec.ts`

### Business Rules & Test Coverage

| ID | Rule | Test Case (in `.spec.ts`) | Coverage Status |
| :--- | :--- | :--- | :--- |
| **N.01** | **Active User Check**<br>Only `ACTIVE` users can create notes. | `create > should successfully create a note for an ACTIVE user`<br>`create > should throw ForbiddenException if user status is PENDING` | **High** (Verified) |
| **N.02** | **User Existence**<br>Must fail if user doesn't exist. | `create > should throw NotFoundException if user does not exist` | **High** (Verified) |
| **N.03** | **Data Persistence**<br>Correctly saves title, content, and userId. | `create > should successfully create a note...` (checks args) | **High** (Verified) |
| **N.04** | **Isolation**<br>User sees only their own notes. | `findAll > should return a list of notes` (Mocks repository call with userId) | **High** (Verified) |
| **N.05** | **Ownership Strictness**<br>User cannot delete others' notes. | `delete > should throw ForbiddenException if note is not owned by user` | **High** (Verified) |
| **N.06** | **Deletion**<br>User can delete their own notes. | `delete > should successfully delete a note owned by the user` | **High** (Verified) |
| **N.07** | **Not Found Handling**<br>Deleting non-existent note throws error. | `delete > should throw NotFoundException if note does not exist` | **High** (Verified) |

### Summary
The `NotesService` is fully covered by unit tests ensuring strict ownership and status checks. All business rules mapped to existing tests.
