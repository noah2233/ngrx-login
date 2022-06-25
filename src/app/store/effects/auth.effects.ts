import { Injectable } from '@angular/core';
// import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, Observable, mergeMap, of, catchError } from 'rxjs';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/catch';
// import { tap } from 'rxjs/operators';

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
            console.log(user);
            return AuthActionTypes.loginSuccess({ token: user.token, email: action.email });
          }),
          catchError((error) => of(AuthActionTypes.loginFailure({ error })))
        )
      )
    );
  });
}
