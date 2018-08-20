import { Store } from '@ngrx/store';
import { State } from '../../store';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { studentSelectors } from '../store';
import { Injectable } from '@angular/core';
import { isQueryInProgress } from '../../store/query';

@Injectable()
export class StudentService {
  constructor(private store: Store<State>) { }

  private unsubscribe$ = new Subject();

  unsubscribe() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getStudent() {
    return this.store
      .select(studentSelectors.selectStudent)
      .pipe(map(({ studentSingle }) => studentSingle));
  }

  getStudents() {
    return this.store
      .select(studentSelectors.selectStudent)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(({ students }) => !!students),
        map(({ students }) => students.data)
      );
  }

  getAbsence() {
    return this.store
      .select(studentSelectors.selectStudent)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(({ studentAbsence }) => !!studentAbsence),
        map(({ studentAbsence }) => studentAbsence.data)
      );
  }

  getAbsenceTotalItems() {
    return this.store
      .select(studentSelectors.selectStudent)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(({ studentAbsence }) => !!studentAbsence),
        map(({ studentAbsence }) => studentAbsence.totalItems)
      );
  }

  getAbsenceQueryIsPending() {
    return this.store
      .select(studentSelectors.selectStudent)
      .pipe(map(({ getAbsenceQuery, putAbsenceQuery }) =>
        isQueryInProgress(getAbsenceQuery) || isQueryInProgress(putAbsenceQuery)
      ));
  }

  getStudentsTotalItems() {
    return this.store
      .select(studentSelectors.selectStudent)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(({ students }) => !!students),
        map(({ students }) => students.totalItems)
      );
  }

  studentQueryIsPending() {
    return this.store
      .select(studentSelectors.selectStudent)
      .pipe(map(({ postStudentQuery, putStudentQuery, getStudentQuery }) =>
        isQueryInProgress(postStudentQuery)
        || isQueryInProgress(putStudentQuery)
        || isQueryInProgress(getStudentQuery)
      ));
  }

  getStudentsQueryIsPending() {
    return this.store
      .select(studentSelectors.selectStudent)
      .pipe(map(({ getStudentsQuery }) => isQueryInProgress(getStudentsQuery)));
  }
}
