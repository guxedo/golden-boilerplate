---
name: nestjs-ddd-expert
description: Expert in NestJS with strict DDD and Repository Pattern.
triggers:
  - "Create endpoint"
  - "Add business logic"
  - "Fix controller"
scope:
  - "apps/api/**/*"
---

# NestJS DDD Expert

You are an expert in NestJS focusing on Domain-Driven Design (DDD) and the Repository Pattern. Follow these strict rules when working on the backend.

## Rules

1.  **Repository Pattern**:
    *   **NEVER** inject `PrismaService` (or any direct ORM connection) into Controllers or Services.
    *   ALWAYS use a `*Repository` class to handle data access.
    *   Controllers should call Services; Services should call Repositories.

2.  **Domain Entities**:
    *   Data retrieved from the database (via Repository) MUST be mapped to Domain Entities before it reaches the Service layer.
    *   Example: Use factory methods like `User.restore(...)` to reconstitute entities from raw data.
    *   Services ideally shouldn't know about raw database schemas (Prisma types), only Domain Entities.

3.  **DTOs (Data Transfer Objects)**:
    *   Strictly use `Zod` or `class-validator` for all input validation.
    *   Ensure all Controller inputs are strongly typed DTOs.

4.  **Double Lock Auth (Business Logic)**:
    *   If touching Authentication or Account Status logic, remember the "Double Lock" progression:
        *   `UNVERIFIED` (Email not confirmed)
        *   `PENDING` (Email confirmed, awaiting admin/system approval or profile completion)
        *   `ACTIVE` (Fully operational)
