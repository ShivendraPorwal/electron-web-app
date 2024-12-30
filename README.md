# ElectronAngularApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
npm start
```

This runs `ng serve`, starting the development server. Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
npm run ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
npm run ng generate --help
```

## Building

To build the project for production, run:

```bash
npm run build
```

This executes `ng build --configuration production`, which compiles your project and stores the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm test
```

This runs `ng test`, which executes all unit tests in the project.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
npm run e2e
```

Note: Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Linting

To check your code for linting issues, run:

```bash
npm run lint
```

To automatically fix linting issues, run:

```bash
npm run lint:fix
```

## Electron Integration

### Starting Electron in Development Mode

To run the application in Electron with a live development server, use:

```bash
npm run electron:dev
```

This command concurrently runs the Angular development server and starts Electron once the server is ready.

### Building and Running Electron

To build the Angular project and start Electron, use:

```bash
npm run electron
```

### Building Electron for Distribution

To build the Electron application for distribution, use:

```bash
npm run electron:build
```

This will generate platform-specific installers.

### Publishing Electron Application

To publish the Electron application, use:

```bash
npm run electron:publish
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Project Folder Structure

```
src/
├── features/ # Feature modules outside app
│   ├── dashboard/
│   │   ├── components/
│   │   │   └── widget/
│   │   │       ├── widget.component.ts
│   │   │       └── widget.component.spec.ts
│   │   ├── pages/
│   │   │   └── dashboard-home/
│   │   │       ├── dashboard-home.component.ts
│   │   │       └── dashboard-home.component.spec.ts
│   │   ├── services/
│   │   │   └── dashboard.service.ts
│   │   └── dashboard.module.ts
│   └── admin/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── admin.module.ts
│
├── shared/ # Standalone shared components
│   ├── components/
│   │   ├── header/
│   │   │   ├── header.component.ts
│   │   │   └── header.component.spec.ts
│   │   └── footer/
│   │       ├── footer.component.ts
│   │       └── footer.component.spec.ts
│   ├── directives/
│   │   └── highlight.directive.ts
│   └── pipes/
│       └── filter.pipe.ts
│
├── entities/ # Standalone domain models
│   ├── models/
│   │   ├── user.model.ts
│   │   └── product.model.ts
│   └── interfaces/
│       ├── api-response.interface.ts
│       └── http-error.interface.ts
│
├── app/ # Core app module
│   ├── core/ # Core services and utilities
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   ├── error.interceptor.ts
│   │   │   └── jwt.interceptor.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── logger.service.ts
│   │   └── core.module.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.scss
```
