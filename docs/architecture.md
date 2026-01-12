# Architecture Documentation

## 1. Authentication ("Double Lock")

We implement a strict "Double Lock" authentication strategy to ensure security and administrative control.

### Flow
1.  **Registration:** A user registers and acts as a `PENDING` user. They cannot access protected resources.
2.  **Login:** The system checks credentials AND the user status.
    -   `IF status != ACTIVE` -> Throw `ForbiddenException("Account pending approval")`.
3.  **Approval:** An Admin must manually approve the user by changing their status to `ACTIVE`.

### Implementation Details
-   **Guards:** `JwtAuthGuard` checks for a valid token.
-   **Strategy:** `JwtStrategy` validates the payload and checks the database for the current status.

## 2. Access Control List (ACL)

We use a Role-Based Access Control (RBAC) system with granular Policies.

### Roles
-   `ADMIN`: Full system access.
-   `USER`: Standard access.

### Decorators
We use custom decorators to enforce permissions:
```typescript
@CheckPermissions(Permission.VIEW_DASHBOARD)
@UseGuards(PoliciesGuard)
```

## 3. Generic Pagination

All list endpoints follow a consistent response structure:

```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "lastPage": 10
  }
}
```

This is handled by a shared utility function `createPaginatedResponse(data, count, page, limit)`.
