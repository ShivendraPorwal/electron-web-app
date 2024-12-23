import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'electron-poc',
    loadChildren: () =>
      import('features/electron-poc').then((m) => m.ElectronPOCModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('features/authentication').then((m) => m.AuthenticationModule),
  },
  {
    path: 'dwt',
    loadChildren: () =>
      import('features/dwt-scanner').then((m) => m.DwtScannerModule),
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
