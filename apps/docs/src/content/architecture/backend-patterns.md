---
title: Backend Architecture & Patterns
description: Patterns for scaling the NestJS backend including Service logic, Pagination, and DDD.
---

# Backend Architecture

## Core Principles

-   **Framework:** NestJS (Modular)
-   **ORM:** Prisma
-   **Architecture:** Hexagonal / DDD-Lite

## Extending the Backend

To add a new feature (e.g., `Products`), follow these steps to ensure compliance with the Golden Boilerplate standards.

### 1. Create a Module
Use pure TypeScript classes where possible. Logic lives in Services, not Controllers.

```bash
nest g module products
nest g controller products
nest g service products
```

### 2. Service Logic (Strict SRP)
Services **MUST** be pure classes that depend only on Repositories or other Services.
**Do not** inject HTTP-specific objects (like `Request` or `Response`) into services.

```typescript
// GOOD
async create(userId: string, dto: CreateProductDto): Promise<Product> { ... }

// BAD
async create(req: Request, res: Response): Promise<void> { ... }
```

### 3. Pagination
We use a standardized pagination utility located in `apps/api/src/common/pagination/pagination.util.ts`.

All `findAll` methods should support generic pagination:

```typescript
// Service
async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.repo.findManyAndCount({ skip, take: limit });
    return createPaginatedResponse(data, total, page, limit);
}
```

The `createPaginatedResponse` utility automatically calculates `lastPage` and structures the JSON response consistently:

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

## Error Handling
Use built-in NestJS exceptions. They are automatically caught by the Global Filter.
-   `NotFoundException` -> 404
-   `ForbiddenException` -> 403
-   `BadRequestException` -> 400
