import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent, MainComponent } from './component';
import { AuthenticationRoutingModule } from './routes';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, AuthenticationRoutingModule],
  declarations: [MainComponent, LoginComponent],
})
export class AuthenticationModule {}
