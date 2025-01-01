# FSCC - Electron Angular App

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

### Starting Electron with Angular server in Development Mode

To run the application in Electron with a live development server, use:

```bash
npm run electron:dev
```

This command concurrently runs the Angular development server and starts Electron once the server is ready.

### Building and Running Electron

To start watch server of electron, use:

```bash
npm run electron
```

This will watch on `http://localhost:4200` and load the web if local server is running on the 4200 port

### Building Electron for Distribution

To build the Electron application for distribution for window system, use:

```bash
npm run electron:build
```

This will generate windows-specific installers.

### Publishing Electron Application

To build and publish the Electron application for window system, use:

```bash
npm run electron:publish
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Here are some resources to help you learn more about Electron and enhance your application's capabilities:

1. **[Official Electron Documentation](https://www.electronjs.org/docs/latest)**  
   Comprehensive guide covering Electron's API, features, and best practices.

2. **[Electron Packager](https://github.com/electron/electron-packager)**  
   A command-line tool to package and distribute Electron applications.

3. **[Electron Builder](https://www.electron.build/)**  
   A complete solution to package and build a distributable application.

## Project Folder Structure

```
src/
├── angular/
├── dist/
└── public/
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
├── styles.scss
├── main.js
├── preload.js
├── package.json
```

## Features

### General Features

- Electron-based desktop application with Angular frontend.
- Auto-updater integrated with GitLab for streamlined update distribution.
- Secure IPC communication using Electron's `contextBridge`.
- Integrated menu options for application management.

### Client Folder Management

- Create and manage client-specific folders locally.
- View all client folders.
- Select a directory to create client folders.
- Delete client folders with confirmation dialogs.

### Update Management

- Check for application updates.
- Notify users about update availability and progress.
- Auto-install updates with user confirmation.

### Application Menu

- Access to scanner features.
- Dialog options for error and informational messages.

---

## Setup and Installation

### Prerequisites

- Node.js (>= 16.x)
- npm (>= 8.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://gitlab.com/FLYdocs-Dev/TechUpgrade/frontend/fscc.git
   cd fscc
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure it as follows:

   ```env
   NODE_ENV=development
   GITLAB_TOKEN=<your-gitlab-token>
   ```

4. Run the application in development mode:

   ```bash
   npm run electron:dev
   ```

5. Build the application for production:

   ```bash
   npm run electron:build:default
   ```

   Running this command will generate a package tailored to the operating system where the command is executed, allowing you to test the build locally.

---

## Key Files and Their Roles

### `main.js`

The main process script that handles:

- Application lifecycle events.
- Window creation.
- Auto-update functionality.
- IPC communication with the renderer process.

### `preload.js`

The preload script that securely bridges communication between the renderer process (Angular) and Electron's main process.

---

## IPC Events

### Renderer to Main

- `get-app-version`: Retrieves the application version.
- `get-os-info`: Retrieves operating system information.
- Folder management events:
  - `client-folder:create`
  - `client-folder:view`
  - `client-folder:select-and-create`
  - `client-folder:delete`

### Main to Renderer

- `log-to-angular`: Logs messages from the main process.
- `download-progress`: Sends update download progress.
- `route-change`: Notifies route changes.

---

Your updated README looks great! Here's the final version with the requested changes formatted for clarity:

---

## Deployment

### Automated via CI/CD

To run a script to make a release, use the following command:

```bash
npm run release
```

To manage version updates of the Electron app, the `create-release.js` script is provided. This script will help automatically update the version in your `package.json` file. It will prompt you for the version type (major, minor, or patch), update the version in `package.json`, and commit the changes to Git. Once the version update is committed to the master branch, the pipeline will get triggered to create a release.

### Building for Production

To build the application for deployment, run:

```bash
npm run electron:build
```

The build process packages your Electron app into a distributable format `.exe` for Windows and prepares it for distribution.

### Publish for Production

To publish the application after building, use the following command:

```bash
npm run electron:publish
```

This process uploads the build to a server, GitHub/Gitlab releases, or another platform for distribution, making your app available for download.

### Auto-Updater Configuration

Ensure the following configurations are correctly set up in your `package.json` and `main.js`:

#### package.json

```json
"build": {
  "appId": "com.fscc.app",
  "publish": [
    {
      "provider": "generic",
      "url": "https://gitlab.com/api/v4/projects/{project-id}/jobs/artifacts/{branch}/raw/dist?job=build"
    }
  ]
}
```

#### main.js

```js
autoUpdater.requestHeaders = {
  "PRIVATE-TOKEN": GITLAB_TOKEN,
};

autoUpdater.setFeedURL({
  provider: "generic",
  url: "https://gitlab.com/api/v4/projects/{project-id}/jobs/artifacts/{branch}/raw/dist?job=build",
});
```

- `project-id`: Replace this with your GitLab project ID (e.g., 65769590).
- `branch`: Replace this with the branch you are deploying (e.g., dev, uat, prod) - current is master.
- `GITLAB_TOKEN`: GitLab token with at least read permission.

Project ID information can be found in the **General Information** section of your GitLab project.

### Important Note

All configurations and scripts provided above are set up for the `master` branch. If you are working with different versions (e.g., dev, uat, prod), you will need to configure the appropriate version-specific settings for each branch. Ensure that the project-id and branch in the package.json and main.js are updated accordingly to reflect the correct environment.

## Troubleshooting

### Common Issues

- **Update Errors**: Ensure `GITLAB_TOKEN` is correctly configured in the `.env` file.
- **Folder Management Errors**: Verify folder permissions and paths.

### Logs

Logs are displayed in the console and can also be accessed through the Angular application.

This should be updated to push the log to server from client app.

---
