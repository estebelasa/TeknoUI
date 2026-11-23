# TeknoUI Architecture

Version: 1.0

---

# Philosophy

TeknoUI is an Angular Component Library.

Its purpose is to provide reusable, accessible and scalable Angular components that can be installed in any Angular application.

TeknoUI is **not** a framework.

It does not replace Angular architecture.

It complements Angular through reusable UI components, directives, pipes and design tokens.

---

# Design Principles

Every implementation inside TeknoUI must follow these principles.

- Simplicity
- Reusability
- Consistency
- Accessibility
- Performance
- Scalability
- Testability

---

# Foundation

Foundation is the base of the library.

```
Foundation
│
├── Tokens
├── Theme
└── Styles
```

Everything inside TeknoUI consumes Foundation.

Components never use hardcoded values.

Incorrect

```scss
padding: 16px;
background: #2563eb;
```

Correct

```scss
padding: tk.$space-md;
background: tk.$sidebar-background;
```

---

# Token Hierarchy

```
Base Tokens
      │
      ▼
Semantic Tokens
      │
      ▼
Component Tokens
      │
      ▼
Angular Components
```

Angular Components NEVER consume Base Tokens directly.

---

# Library Structure

```
foundation/

components/

directives/

pipes/

shared/

testing/
```

---

# Shared

Shared contains reusable types that are not tied to a specific component.

```
shared

constants

interfaces

models

types

utils
```

---

# Component Categories

Components are classified by complexity.

## Level 1

Simple Components

Examples

- tk-icon
- tk-avatar
- tk-divider
- tk-badge

Structure

```
Component

Styles

Tests

Stories
```

---

## Level 2

Interactive Components

Examples

- tk-button
- tk-checkbox
- tk-switch
- tk-input

Structure

```
Component

State (optional)

Testing

Stories
```

---

## Level 3

Complex Components

Examples

- tk-sidebar
- tk-dialog
- tk-table
- tk-tree
- tk-menu

These components may include an internal architecture.

```
Component

State

Actions

Selectors

Internal Directives

Internal Services

Testing

Stories

README
```

This architecture is private.

It is never exposed through the public API.

---

# Internal Component Architecture

Complex components separate responsibilities.

```
User

↓

Angular Component

↓

Actions

↓

State

↓

Selectors

↓

View
```

External operations

```
Actions

↓

Services

↓

Browser APIs

Storage

Router

HTTP
```

---

# Responsibilities

## Component

Responsible only for

- Rendering
- Inputs
- Outputs
- Dependency composition

The component should contain as little logic as possible.

---

## State

Stores writable signals.

Allowed

- signal()
- computed()
- state mutation

Forbidden

- HTTP
- Router
- Browser APIs
- Business logic

---

## Actions

Coordinates user interactions.

Allowed

- Update state
- Call internal services
- Emit outputs

Forbidden

- Business rules
- HTTP implementation

---

## Selectors

Contain computed signals.

Never modify state.

Never call services.

---

## Services

Services are optional.

They exist only when a component needs to interact with external resources.

Examples

- LocalStorage
- Router
- ResizeObserver
- IntersectionObserver

---

# Directives

TeknoUI supports two directive categories.

Reusable directives

```
tkVisible

tkAutofocus

tkClickOutside
```

Component directives

```
SidebarItemDirective

DialogFocusTrapDirective
```

Component directives are private.

Only reusable directives are exported by the library.

---

# Testing

Every component must include

- Unit Tests
- Accessibility Tests
- Storybook Stories
- README

---

# Accessibility

Every interactive component must support

- Keyboard Navigation
- Focus Visible
- ARIA
- Reduced Motion

---

# Future

Dark Theme

RTL

SSR

Internationalization

Container Queries

CSS Layers