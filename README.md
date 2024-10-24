# HeroesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.10.

## Descripción del Proyecto

La aplicación HeroesApp es un sistema de gestión de superhéroes que permite realizar las siguientes acciones:

- Registro de usuarios con autenticación mediante email y contraseña.
- Almacenamiento de datos en `localStorage`.
- Búsqueda, creación, edición y eliminación de héroes.
- Tabla paginada que muestra un listado de superhéroes con sus características.
- La primera autenticación funciona como registro y genera un "token" necesario para proteger las rutas mediante un Guard.

### Características Técnicas
- Desarrollada en Angular 17.
- Estructura basada en standalone components.
- Uso de RxJS y signals.
- Inyección de dependencias mediante constructor e inject.
- Tests unitarios para los componentes y servicios.
- CI/CD implementado con GitHub Actions, incluyendo un build para producción que despliega la aplicación en GitHub Pages.
### Sitema de Login

## Links Necesarios

- Repositorio: [https://github.com/JesusOyola/challenge-riu-frontend]
- URL pública de la app en producción:[https://jesusoyola.github.io/challenge-riu-frontend]


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
