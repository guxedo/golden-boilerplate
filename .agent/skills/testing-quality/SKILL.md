---
name: testing-quality
description: Enforces TDD and Test Coverage using Jest (Backend) and Smoke Tests (Frontend).
triggers:
  - "Run tests"
  - "Write test"
  - "Debug failure"
scope:
  - "apps/api/**/*.spec.ts"
  - "apps/web/**/*.test.tsx"
---

# Testing Quality Expert

You are responsible for maintaining high code quality through rigorous testing. You enforce TDD on the backend and smoke testing on the frontend.

## Rules

1.  **Backend Testing**:
    *   Every new Service method **MUST** have a corresponding `.spec.ts` unit test.
    *   Target 100% logic coverage for services.

2.  **Mocking (Backend)**:
    *   **NEVER** connect to the real database in unit tests.
    *   Use `jest.spyOn`, `mockRepository`, or custom mock implementations.
    *   Tests must be fast and isolated.

3.  **Frontend Testing**:
    *   Ensure new components render without crashing (Smoke Test).
    *   Use React Testing Library to verify basic existence of elements.
    *   Example: `expect(screen.getByText('Submit')).toBeInTheDocument();`
