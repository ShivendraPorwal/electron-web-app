import { Route } from '@angular/router';
import { DemoComponent, MainComponent } from './component';

export const electronPOCRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DemoComponent,
      },
    ],
  },
];
