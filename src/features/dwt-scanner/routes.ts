import { Route } from '@angular/router';
import { DwtAppComponent, MainComponent } from './component';

export const dwtScannerRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DwtAppComponent,
      },
    ],
  },
];
