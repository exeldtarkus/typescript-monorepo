
# TypeScript Monorepo

This is a TypeScript monorepo designed for managing multiple libraries and services efficiently.

---

## Install Project

Clone the project:

```bash
git clone https://github.com/exeldtarkus/typescript-monorepo.git
cd typescript-monorepo
```

Install all dependencies for the monorepo:

```bash
npm install
```

---

## Creating a Library or Service

To create a new **library** or **service**, run:

```bash
npm run create-lib-service
```

1. Enter `1` to create a **library**.
2. Enter `2` to create a **service**.
3. Enter the name of the library or service (e.g., `core-server` or `ms-user`).

---

## Installing Dependencies

### Public Packages

To install a public package in a specific library or service:
```bash
npm install <package-name> --workspace=<path-to-service-or-library>
```

Example:
```bash
npm install nodemon --workspace=services/ms-user
```

### Local Packages

To install a local package (library) in another service or library:
```bash
npm install <package-name> --workspace=<path-to-service-or-library>
```

Example:
```bash
npm install @lib/core-logger --workspace=services/ms-user
```

---

## Cleaning the Project

To clean `build` folders, `node_modules`, and `tsconfig.tsbuildinfo`:
```bash
npm run clean
```

---

## Building the Project

To build all libraries and services:
```bash
npm run build
```

---

## Running Project

### Running in Development Mode:

1. Run a specific service in development mode:
   ```bash
   npm run dev:ms-user
   ```

2. Alternatively, navigate to the service directory and run:
   ```bash
   cd services/ms-user
   npm run dev
   ```

---

## Example Workflow

1. **Create a new service or library**:
   ```bash
   npm run create-lib-service
   ```

2. **Install a dependency**:
   ```bash
   npm install nodemon --workspace=services/ms-user
   ```

3. **Run a service in development**:
   ```bash
   npm run dev:ms-user
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

---

