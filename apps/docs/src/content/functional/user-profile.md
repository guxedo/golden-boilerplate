---
title: User Profile Feature
description: Functional specification for User Profile and Password updates.
---

# User Profile Feature

**Actors:**
- **User**: An authenticated user with `ACTIVE` status.
- **Client**: The frontend application (React).
- **API**: The NestJS Backend (UsersController).
- **UsersService**: Business logic for user updates.
- **Database**: Stores user records.

## Use Cases
1.  **Update Profile:** User updates their display name.
2.  **Update Password:** User updates their password (providing current password).

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant API as API (UsersController)
    participant Service as UsersService
    participant DB as Database

    %% Update Profile (Name)
    User->>Client: Edit Name & Click Save
    Client->>API: PATCH /users/profile { name }
    Note right of API: AuthGuard validates JWT
    API->>Service: updateProfile(userId, name)
    Service->>DB: findById(userId)
    alt User Found
        Service->>DB: save(newName)
        DB-->>Service: Updated User
        Service-->>API: { id, name, email }
        API-->>Client: 200 OK
    else User Not Found
        Service-->>API: Throw NotFoundException
        API-->>Client: 404 Not Found
    end

    %% Update Password
    User->>Client: Enter Current & New Password
    Client->>API: PATCH /users/password { current, new }
    API->>Service: updatePassword(userId, dto)
    Service->>DB: findById(userId)
    alt Password Matches
        Service->>DB: save(newPassword)
        DB-->>Service: Updated User
        Service-->>API: { message: "Password updated" }
        API-->>Client: 200 OK
    else Invalid Password
        Service-->>API: Throw ForbiddenException
        API-->>Client: 403 Forbidden
    end
```
