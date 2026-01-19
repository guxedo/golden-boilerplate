# ✨ Golden Boilerplate

![CI Status](https://img.shields.io/github/actions/workflow/status/guxedo/golden-boilerplate/ci.yml?branch=main)
![License](https://img.shields.io/badge/license-MIT-blue)
![Stack](https://img.shields.io/badge/stack-Turborepo%20%7C%20NestJS%20%7C%20React-black)

A production-ready Monorepo designed with strict adherence to **SOLID principles**, **Domain-Driven Design (DDD)**, and **Atomic Architecture**.

This project serves as the foundation for scalable, enterprise-grade applications, featuring a "Double Lock" Authentication strategy and a fully automated "Docs-as-Code" workflow.

## 📚 Documentation Map

Our internal documentation is located in `apps/docs`.

### 🧠 Core Concepts
*   [**SOLID & OOP in Practice**](./apps/docs/src/content/architecture/core-principles.md): Understanding the "Why" behind our code structure.
*   [**Backend Patterns**](./apps/docs/src/content/architecture/backend-patterns.md): Services, Pagination, and Error Handling.
*   [**Frontend Architecture**](./apps/docs/src/content/architecture/frontend-patterns.md): Atoms, Hooks, and Server State.
*   [**Database Design**](./apps/docs/src/content/architecture/database-design.md): Schema Diagrams and Migrations.
*   [**AI Software Factory**](./apps/docs/src/content/blog/ai-software-factory-en.md): The Antigravity Flow Architecture.

### ⚡ Development
*   [**Functional Specs**](./apps/docs/src/content/functional): Use Cases and Sequence Diagrams.
*   [**QA Plans**](./apps/docs/src/content/qa): Test coverage and Business Rules.

## 🚀 Quick Start

1.  **Clone & Install:**
    ```bash
    git clone https://github.com/guxedo/golden-boilerplate.git
    cd golden-boilerplate
    pnpm install
    ```

2.  **Start Environment:**
    ```bash
    docker-compose up -d
    pnpm dev
    ```
    *   **Frontend:** http://localhost:5173
    *   **Backend:** http://localhost:3000
    *   **Docs:** http://localhost:5174 (if running docs dev)

## 🔑 Default Credentials

| Role | Email | Password | Status |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `password123` | `ACTIVE` |
| **User** | `user@example.com` | `password123` | `ACTIVE` |

## 🛠 Technology Stack

*   **Monorepo:** Turborepo
*   **Backend:** NestJS, Prisma, PostgreSQL, Passports, Jest
*   **Frontend:** React 18, Vite, TanStack Query, TailwindCSS, Shadcn/UI
*   **Docs:** VitePress (Docs-as-Code)
*   **Automation:** GitHub Actions, Custom Agents

---
_Maintained by the Antigravity Team_
