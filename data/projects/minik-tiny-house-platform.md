# Minik -- Tiny House Reservation System

## Overview

Minik is a full-stack web-based reservation and management system for tiny house properties. The project originated from a requirement to design an MSSQL database incorporating views, stored procedures, and transactions, with data access handled exclusively through ADO.NET. Rather than building a conventional desktop application, the decision was made to implement a modern web architecture with role-based authorization, RESTful APIs, and a React-based frontend.

## Context and Requirements

- Design a normalized, relational schema on MSSQL with mandatory use of views, stored procedures, and transactions
- Use ADO.NET for direct data access without an ORM layer
- Implement role-based authorization supporting multiple user types (admin, customer, maintenance staff)
- Maintain a clear separation between frontend and backend through RESTful APIs

## Architecture

The system follows a layered architecture with a clear frontend-backend separation:

- **Backend:** ASP.NET Core REST API with ADO.NET-based data access
- **Database:** MSSQL with stored procedures handling reservation, maintenance, and user management operations
- **Frontend:** React (Vite) with component-based UI and role-driven screen flows
- **Security:** BCrypt for password hashing, role-based access control across all endpoints
- **Documentation:** Swagger for API documentation and testing

## Technical Contributions

- Designed and implemented RESTful APIs using ASP.NET Core
- Built a repository-style data access layer with ADO.NET, providing direct SQL visibility and lower latency compared to ORM-based approaches
- Designed stored procedures and transaction logic for reservation, maintenance, and user workflows
- Established an extensible architecture with a well-defined frontend-backend boundary
- Implemented component-based React UI with asynchronous request handling

## Testing and Results

- Data integrity scenarios validated through database-level transactions
- End-to-end reservation flows tested both manually and semi-automatically
- Error handling implemented for conflicting reservations, missing data, and unauthorized access attempts
- The final system provides a fully functional web-based management platform covering the entire tiny house reservation lifecycle with role-based authorization

## Outcome

A working tiny house reservation system was delivered, covering the full workflow from user registration to booking management. The project provided practical experience in REST architecture, asynchronous programming, database optimization, and layered system design.
