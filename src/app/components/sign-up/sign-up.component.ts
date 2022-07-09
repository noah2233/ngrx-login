import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/user';
import { AppState } from '../../store/app.states';
import { getAuthState } from '../../store/selectors/auth.selectors';
import { signup } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null = null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(getAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password,
    };
    this.store.dispatch(signup({ email: payload.email || '', password: payload.password || '' }));
  }
}
