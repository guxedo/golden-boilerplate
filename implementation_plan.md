# implementation_plan.md

## Feature: User Profile & Settings

This Implementation Plan describes the creation of the "User Profile" feature, allowing users to update their personal information and password.

---

### 1. Backend Implementation
> **Governing Skill:** `nestjs-ddd`

We will extend the existing `users` module to support self-management.

#### Controller (`apps/api/src/users/users.controller.ts`)
*   **Endpoints**:
    *   `PATCH /users/profile`: Updates user's name.
        *   Guard: `AuthGuard` (Authenticated user).
        *   Payload: `name` (string).
    *   `PATCH /users/password`: Updates user's password.
        *   Guard: `AuthGuard` (Authenticated user).
        *   Payload: `currentPassword` (string), `newPassword` (string).
*   **Access Control**: Uses `req.user.sub` (from JWT) to identify the target user. Do NOT allow users to update others (unless Admin, but this feature is for *self*).

#### Service (`apps/api/src/users/users.service.ts`)
*   **Methods**:
    *   `updateProfile(userId: string, name: string)`: Updates the name.
    *   `updatePassword(userId: string, dto: UpdatePasswordDto)`:
        *   Verifies `currentPassword` matches stored hash.
        *   Hashes `newPassword` before saving.
        *   Updates the user entity.

#### DTOs (`apps/api/src/users/dto/`)
*   `UpdateProfileDto`: `name` (IsString, IsNotEmpty).
*   `UpdatePasswordDto`: `currentPassword`, `newPassword` (IsString, MinLength(6)).

---

### 2. Frontend Implementation
> **Governing Skill:** `react-shadcn`

#### Page (`apps/web/src/pages/Settings.tsx`)
*   **Route**: `/settings`.
*   **Layout**: `DashboardLayout`.
*   **Structure**:
    *   **Tab 1: Profile**:
        *   Input: Name.
        *   Button: "Save Changes".
    *   **Tab 2: Security**:
        *   Input: Current Password.
        *   Input: New Password.
        *   Input: Confirm New Password.
        *   Button: "Update Password".

#### API Integration
*   `useMutation` hooks for profile and password updates.
*   Toast notifications on success/error.

---

### 3. Tasks Breakdown for GitOps
1.  **Backend Profile Logic**: Implement `PATCH /users/profile` and service logic.
2.  **Backend Password Logic**: Implement `PATCH /users/password` with validation.
3.  **Frontend Settings Page**: Create the UI and integrate with API.
