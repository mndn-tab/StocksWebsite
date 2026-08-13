
# Repository Design Pattern
It creates a layer between business logic and database
```
Controller
    ↓
  Model
    ↓
Repository
    ↓
Database
```
Benefits
* Separation of Concerns: Business logic does not need to know how data is saved or retrieved.
* Better Testability: You can easily create fake or "mock" repositories to run tests without connecting to a real database.
* Flexibility: If you change your database technology later, you only update the repository class, leaving your core business logic untouched

# Layered architecture
Organizes code into decoupled layers, each with a single responsibility.

* presentation layer
* business logic layer
* database layer

# MVC architecture (Model-View-Controller)

<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/3d8f9a0c-39d2-4141-bc4b-6d4e6431f7f0" />

