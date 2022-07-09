import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';

import { reducers } from './store/app.states';

@NgModule({
  declarations: [AppComponent, LandingComponent, SignUpComponent, LogInComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {}),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
