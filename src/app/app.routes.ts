import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../app/pages/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../app/pages/register/register.routes').then((m) => m.REGISTER_ROUTES),
  },
  {
    path: 'home',
    loadComponent: () => import('../app/pages/dashboard/dashboard.component'),
    canActivate:[loginGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/pages/dashboard/home/home.component'),
      },
    ],
  },
  {
    path: 'create-hero',
    loadComponent: () => import('../app/pages/dashboard/dashboard.component'),
    canActivate:[loginGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/pages/dashboard/create-hero/create-hero.component'),
      },
    ],
  },
  {
    path: 'edit-hero',
    loadComponent: () => import('../app/pages/dashboard/dashboard.component'),
    canActivate:[loginGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/pages/dashboard/edit-hero/edit-hero.component'),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'register',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'register',
  },
];
