import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/user';
import { AppState } from '../../store/app.states';
import { signup } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  user: User = new User();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password,
    };
    this.store.dispatch(signup({ email: payload.email || '', password: payload.password || '' }));
  }
}
