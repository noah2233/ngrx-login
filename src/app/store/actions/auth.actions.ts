import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: any; email: string }>());
export const loginFailure = createAction('[Auth] Login Fail', props<{ error: any }>());

export const signup = createAction('[Auth] Signup', props<{ email: string; password: string }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ token: any; email: string }>());
export const signupFailure = createAction('[Auth] Signup Fail', props<{ error: any }>());
