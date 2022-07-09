import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.states';
import { getAuthState } from '../../store/selectors/auth.selectors';
import { logout } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  getState: Observable<any>;
  isAuthenticated: boolean = false;
  user: User = new User();
  errorMessage = null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(getAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut(): void {
    this.store.dispatch(logout());
  }
}
