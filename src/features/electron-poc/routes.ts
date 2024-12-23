import { Route } from '@angular/router';
import { DemoComponent, MainComponent } from './component';

export const electronPOCRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'demo',
        component: DemoComponent,
      },
    ],
  },
];
