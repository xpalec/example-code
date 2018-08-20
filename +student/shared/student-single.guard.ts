import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError, throttle } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';

import { State } from '../../store';
import { routerActions } from '../../store/router';
import * as StudentActions from '../store/student/student.actions';
import { hasQuerySucceeded, hasQueryFailed, hasQueryStatus } from '../../store/query';
import { studentSelectors } from '../store';

@Injectable()
export class StudentSingleGuard implements CanActivate {
  constructor(private store: Store<State>) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const { id } = route.params;

    return this.fillStore(id).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

  fillStore(id: string) {
    return this.store
      .select(studentSelectors.selectStudent)
      .pipe(
        throttle(() => timer(50)),
        tap(({ getStudentQuery }) => {
          if (hasQueryFailed(getStudentQuery)) {
            this.store.dispatch(new routerActions.Navigate({ url: '/404' }));
            throw Observable.throw(new Error());
          }
            if (!hasQueryStatus(getStudentQuery)) {
            this.store.dispatch(new StudentActions.SetStudent(id));
          }
        }),
        filter(({ getStudentQuery }) => hasQuerySucceeded(getStudentQuery)),
        take(1),
      );
  }
}
