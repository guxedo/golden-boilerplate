---
title: Personal Notes Feature
description: Functional specification for the Personal Notes CRUD feature.
---

# Personal Notes Feature

**Actors:**
- **User**: An authenticated user with `ACTIVE` status.
- **Client**: The frontend application (React).
- **API**: The NestJS Backend (NotesController).
- **NotesService**: Business logic for notes.
- **Database**: Stores notes (Prisma).

## Use Cases
1.  **Create Note:** User creates a title/content note.
2.  **List Notes:** User sees only their own notes.
3.  **Delete Note:** User deletes one of their notes.

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant API as API (NotesController)
    participant Service as NotesService
    participant DB as Database

    %% Create Note
    User->>Client: Write Note & Click Save
    Client->>API: POST /notes {title, content}
    Note right of API: AuthGuard validates JWT
    API->>Service: create(userId, dto)
    Service->>DB: Find User (Check Status)
    alt User ACTIVE
        Service->>DB: create({ ...dto, userId })
        DB-->>Service: Note Created
        Service-->>API: Note Entity
        API-->>Client: 201 Created
    else User PENDING/INACTIVE
        Service-->>API: Throw ForbiddenException
        API-->>Client: 403 Forbidden
    end

    %% List Notes
    User->>Client: View Notes Page
    Client->>API: GET /notes
    API->>Service: findAll(userId)
    Service->>DB: findAllByUserId(userId)
    DB-->>Service: [Note, Note...]
    Service-->>API: [Note, Note...]
    API-->>Client: 200 OK (List)

    %% Delete Note
    User->>Client: Click Delete
    Client->>API: DELETE /notes/:id
    API->>Service: delete(userId, noteId)
    Service->>DB: findById(noteId)
    alt Note belongs to User
        Service->>DB: delete(noteId)
        DB-->>Service: Success
        Service-->>API: void
        API-->>Client: 200 OK
    else Note belongs to other
        Service-->>API: Throw ForbiddenException
        API-->>Client: 403 Forbidden
    end
```
