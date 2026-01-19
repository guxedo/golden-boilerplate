---
title: SOLID & OOP Principles
description: How we apply Software Design Principles in this boilerplate.
---

# Core Principles: SOLID & OOP

The Golden Boilerplate is built on strong architectural foundations. We don't just write code that works; we write code that is maintainable, scalable, and testable.

## S - Single Responsibility Principle (SRP)
**"A class should have one, and only one, reason to change."**

*   **Backend:** A `UsersController` only handles HTTP requests for users. The business logic is delegated to `UsersService`. The database access is delegated to `UsersRepository`.
*   **Frontend:** A `Button` component only handles rendering a button. It doesn't know about API calls.

## O - Open/Closed Principle (OCP)
**"Entities should be open for extension, but closed for modification."**

*   **Decorators:** We use NestJS Decorators (e.g., `@CheckPermissions`) to add security checks to methods without modifying the method's internal code.
*   **Guards:** Authentication logic is in `AuthGuard`, not inside every controller method.

## L - Liskov Substitution Principle (LSP)
**"Derived classes must be substitutable for their base classes."**

*   **Repositories:** Although we use Concrete Prisma repositories now, our Service designs allow properly implementing an Interface (e.g., `IUserRepository`) so we could swap Prisma for TypeORM without breaking the Service logic.

## I - Interface Segregation Principle (ISP)
**"Many client-specific interfaces are better than one general-purpose interface."**

*   **DTOs:** We create specific DTOs for each operation (`CreateUserDto`, `UpdateProfileDto`) instead of using a single giant `User` object for everything. This prevents clients from sending data they shouldn't (like manually setting `isAdmin`).

## D - Dependency Inversion Principle (DIP)
**"Depend upon abstractions, not concretions."**

*   **Dependency Injection:** In NestJS, we inject `UsersService` into `UsersController`. The Controller doesn't create the Service using `new UsersService()`. This allows the Inversion of Control (IoC) container to manage dependencies, making unit testing (with Mocks) extremely easy.
