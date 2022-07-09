import { createReducer, on } from '@ngrx/store';

import { User } from '../../models/user';
import * as AuthAction from '../actions/auth.actions';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthAction.loginSuccess, (state, action): State => {
    return {
      ...state,
      isAuthenticated: true,
      user: {
        token: action.token,
        email: action.email,
      },
      errorMessage: null,
    };
  }),
  on(AuthAction.loginFailure, (state, action): State => {
    return {
      ...state,
      errorMessage: 'Incorrect email and/or password.',
    };
  }),
  on(AuthAction.signupSuccess, (state, action): State => {
    return {
      ...state,
      isAuthenticated: true,
      user: {
        token: action.token,
        email: action.email,
      },
      errorMessage: null,
    };
  }),
  on(AuthAction.signupFailure, (state, action): State => {
    return {
      ...state,
      errorMessage: 'That email is already in use.',
    };
  })
);
