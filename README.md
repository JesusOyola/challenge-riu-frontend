# HeroesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.10.

## Project Description

The HeroesApp is a superhero management system that allows for the following actions:

- User registration with authentication via email and password.
- Data storage in localStorage.
- Search, creation, editing, and deletion of heroes.
- A paginated table displaying a list of superheroes with their characteristics.
- The first authentication acts as registration and generates a "token" necessary to protect routes using a Guard.

### Technical Features

- Developed in Angular 17.
- Structure based on standalone components.
- Use of RxJS and signals.
- Dependency injection through constructor and inject.
- Unit tests for components and services.
- CI/CD implemented with GitHub Actions, including a production build that deploys the application to GitHub Pages.

### Authentication System

- The application features a basic registration and login system that requires the user to enter an email and password. Upon registration, a user, password, and token are created, and these credentials are stored in localStorage. The purpose of this registration is to implement a guard that protects the routes; without registration, the token is not generated, so the guard will prevent access to any route.

## Links Necesarios

- Repository: [https://github.com/JesusOyola/challenge-riu-frontend]
- Public URL production app:[https://jesusoyola.github.io/challenge-riu-frontend]

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
