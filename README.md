# Static Angular App

A fully static Angular application that generates static HTML files after build.

## Features

- ✅ Static Site Generation (SSG)
- ✅ Pre-rendered routes
- ✅ No server required for deployment
- ✅ Optimized for hosting on static hosting services

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Build & Deploy

```bash
# Build for production (static)
npm run build:static

# The static files will be in dist/static-angular-app/browser/
```

## Deployment

The `dist/static-angular-app/browser/` directory contains all static files that can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Cloudflare Pages
- Any static web server

## Configuration

The app is configured for static generation by:

1. Setting `outputMode: "static"` in `angular.json`
2. Removing client hydration for pure static output
3. Using Angular's built-in SSG capabilities

The build process pre-renders all routes and generates static HTML files that work without any server-side processing.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
