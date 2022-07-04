import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../reducers/auth.reducers';

// Selector functions
export const getAuthState = createFeatureSelector<State>('auth');

export const getUser = createSelector(getAuthState, (state) => state.user);
