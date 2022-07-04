import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { State } from '../../store/reducers/auth.reducers';
import { getUser } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authStore: Store<State>) {}

  ngOnInit(): void {}

  getUserEmail() {
    return this.authStore.select(getUser).pipe(map((user) => user?.email));
  }
}
