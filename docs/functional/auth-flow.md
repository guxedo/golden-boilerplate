# functional/auth-flow.md

## Double Lock Authentication Flow

**Actors:**
- **User**: The person trying to register and log in.
- **Admin**: The system administrator who approves accounts.
- **Client**: The frontend application (React).
- **API**: The NestJS Backend (AuthController).
- **AuthService**: Handles business logic for authentication.
- **MailService**: Handles sending emails.
- **Database**: Stores user records.

## Use Cases
1.  **Register:** User signs up with email/password. System sends verification email. Status: `UNVERIFIED`.
2.  **Verify Email:** User clicks link. System validates token. Status: `PENDING`.
3.  **Admin Approval:** Admin reviews `PENDING` users and activates them. Status: `ACTIVE`.
4.  **Login:** User logs in. System checks credentials AND `ACTIVE` status.

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Admin
    participant Client
    participant API as API (AuthController)
    participant Service as AuthService
    participant Mail as MailService
    participant DB as Database

    %% Registration
    User->>Client: Enters Email/Password
    Client->>API: POST /auth/register
    API->>Service: register(dto)
    Service->>DB: create(status: UNVERIFIED)
    Service->>Mail: sendVerificationEmail()
    Service-->>API: User Created
    API-->>Client: 201 Created (Check Email)

    %% Verification
    User->>Client: Clicks Link (Token)
    Client->>API: POST /auth/verify-email?token=...
    API->>Service: verifyEmail(token)
    Service->>DB: findByToken() & update(status: PENDING)
    Service-->>API: Success "Pending Approval"
    API-->>Client: 200 OK

    %% Double Lock (Admin Approval)
    Note over User, Admin: User cannot login yet (Status: PENDING)
    Admin->>API: PATCH /users/:id/status (ACTIVE)
    API->>Service: (UserService update)
    Service->>DB: update(status: ACTIVE)
    DB-->>Service: Success

    %% Login
    User->>Client: Login (Email/Password)
    Client->>API: POST /auth/login
    API->>Service: validateUser()
    Service->>DB: findByEmail()
    Service->>Service: checkDoubleLock()
    alt Status is ACTIVE
        Service-->>API: User Valid
        API->>Service: login(user) -> Generate JWT
        Service-->>API: { access_token }
        API-->>Client: 200 OK (Token)
    else Status is PENDING or UNVERIFIED
        Service-->>API: Throw ForbiddenException
        API-->>Client: 403 Forbidden
    end
```
