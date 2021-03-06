import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, of, catchError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

import * as AuthActionTypes from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authService: AuthService, private router: Router) {}

  login$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActionTypes.login),
      mergeMap((action) =>
        this.authService.logIn(action.email, action.password).pipe(
          map((user) => {
            return AuthActionTypes.loginSuccess({ token: user.token, email: action.email });
          }),
          catchError((error) => of(AuthActionTypes.loginFailure({ error })))
        )
      )
    );
  });

  logInSuccess$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActionTypes.loginSuccess),
        tap((user) => {
          localStorage.setItem('token', user.token);
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  signup$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActionTypes.signup),
      mergeMap((action) =>
        this.authService.signUp(action.email, action.password).pipe(
          map((user) => {
            return AuthActionTypes.signupSuccess({ token: user.token, email: action.email });
          }),
          catchError((error) => of(AuthActionTypes.signupFailure({ error })))
        )
      )
    );
  });

  signupSuccess$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActionTypes.signupSuccess),
        tap((user) => {
          localStorage.setItem('token', user.token);
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActionTypes.logout),
        tap(() => {
          localStorage.removeItem('token');
        })
      );
    },
    { dispatch: false }
  );
}
