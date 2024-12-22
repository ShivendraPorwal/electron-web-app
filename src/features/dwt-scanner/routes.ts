import { Route } from '@angular/router';
import { DwtAppComponent, MainComponent } from './component';

export const dwtScannerRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'demo',
        component: DwtAppComponent,
      },
    ],
  },
];
