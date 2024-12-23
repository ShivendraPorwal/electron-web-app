import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'shared/shared.module';
import { CommonModule } from '@angular/common';
import { appConfig } from './app.config';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ButtonModule,
    ToolbarModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
  ],
  ...appConfig,
  bootstrap: [AppComponent],
})
export class AppModule {}
