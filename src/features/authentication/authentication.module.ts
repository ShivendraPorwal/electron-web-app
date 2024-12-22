import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent, MainComponent } from './component';
import { authenticationRoutes } from './routes';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
  ],
  declarations: [MainComponent, LoginComponent],
})
export class AuthenticationModule {}
