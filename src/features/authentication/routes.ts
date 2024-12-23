import { Route } from '@angular/router';
import { LoginComponent, MainComponent } from './component';

export const authenticationRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
