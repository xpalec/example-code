import { Injectable } from '@angular/core';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Actions, ofType, Effect, } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { mergeMap, catchError, map, filter } from 'rxjs/operators';
import { concat } from 'rxjs/observable/concat';

import * as QueryActions from '../../../store/query/query.actions';
import * as LayoutActions from '../../../core/layout/store/layout.actions';
import * as StudentActions from './student.actions';
import {
  POST_STUDENT,
  GET_STUDENT,
  PUT_STUDENT,
  GET_STUDENTS,
  DELETE_STUDENT,
  DELETE_STUDENTS,
  PUT_ABSENCE,
  GET_ABSENCE
} from './student.state';
import { SnackbarStatus } from '../../../core/layout/components/snackbar/snackbar/snackbar.model';
import { RouterState, routerActions } from '../../../store/router';
import { checkRouter } from '../../../../utils';
import { StudentRepository } from '../../shared/student.repository';
import * as PaymentActions from '../../../+payment/store/payment/payment.actions';
import * as LessonActions from '../../../+lesson/store/lesson/lesson.actions';
import { getId, startsWith } from '../../../../utils/router.utils';

@Injectable()
export class StudentEffects {

  constructor(
    private actions$: Actions,
    private studentRepository: StudentRepository
  ) { }

  @Effect() postStudent$ = this.actions$
    .pipe(
      ofType<StudentActions.CreateStudent>(StudentActions.CREATE_STUDENT),
      mergeMap(({ profile }) => concat(
        of(new QueryActions.QueryInProgress(POST_STUDENT)),
        this.studentRepository
          .postStudent(profile)
          .pipe(
            mergeMap(data => concat(
              of(new QueryActions.QuerySuccess(POST_STUDENT, data)),
              of(new LayoutActions.ShowSnackbar(SnackbarStatus.SUCCESS, 'form.student.createSuccess')),
              of(new routerActions.Navigate({ url: '/student' })),
            )),
            catchError(error => of(new QueryActions.QueryFailure(POST_STUDENT, error))),
          ),
      )),
    );

  @Effect() putStudent$ = this.actions$
    .pipe(
      ofType<StudentActions.EditStudent>(StudentActions.EDIT_STUDENT),
      mergeMap(({ id, profile }) => concat(
        of(new QueryActions.QueryInProgress(PUT_STUDENT)),
        this.studentRepository
          .putStudent(id, profile)
          .pipe(
            mergeMap(data => concat(
              of(new QueryActions.QuerySuccess(PUT_STUDENT, data)),
              of(new LayoutActions.ShowSnackbar(SnackbarStatus.SUCCESS, 'form.student.saveSuccess')),
              of(new routerActions.Navigate({ url: '/student' })),
            )),
            catchError(error => of(new QueryActions.QueryFailure(PUT_STUDENT, error))),
          ),
      )),
    );

  @Effect() getStudent$ = this.actions$
    .pipe(
      ofType<StudentActions.SetStudent>(StudentActions.SET_STUDENT),
      mergeMap(({ id }) => concat(
        of(new QueryActions.QueryInProgress(GET_STUDENT)),
        of(new LayoutActions.SpinnerToggle(true)),
        this.studentRepository
          .getStudent(id)
          .pipe(
            mergeMap(data => concat(
              of(new QueryActions.QuerySuccess(GET_STUDENT, data)),
              of(new LayoutActions.SpinnerToggle(false)),
              of(new StudentActions.SetStudentSuccess(data)),
            )),
            catchError(error => of(new QueryActions.QueryFailure(GET_STUDENT, error))),
          ),
        ),
      ),
    );

  @Effect() getStudents$ = this.actions$
    .pipe(
      ofType<StudentActions.GetStudents>(StudentActions.GET_STUDENTS),
      mergeMap(({ queryParams }) => concat(
        of(new QueryActions.QueryInProgress(GET_STUDENTS)),
        this.studentRepository
          .getStudents(queryParams)
          .pipe(
            mergeMap(data => concat(
              of(new QueryActions.QuerySuccess(GET_STUDENTS, data)),
              of(new StudentActions.GetStudentsSuccess(data)),
            )),
            catchError(error => of(new QueryActions.QueryFailure(GET_STUDENTS, error))),
          ),
      )),
    );

  @Effect() getInvoices$ = this.actions$
    .pipe(
      ofType<RouterNavigationAction<RouterState>>(ROUTER_NAVIGATION),
      map(({ payload: { routerState } }) => routerState),
      filter(({ url }) => checkRouter(url, 'student/invoices', true)),
      mergeMap(({ url, queryParams }) => {
        const id = getId(url);
        return concat(
          of(new PaymentActions.GetInvoices({
            ...queryParams,
            'items.student': id
          }))
        );
      }),
    );

  @Effect() getLessons$ = this.actions$
    .pipe(
      ofType<RouterNavigationAction<RouterState>>(ROUTER_NAVIGATION),
      map(({ payload: { routerState } }) => routerState),
      filter(({ url }) => startsWith(url, '/student/lessons')),
      mergeMap(({ url, queryParams }) => {
        const id = getId(url);
        return concat(
          of(new LessonActions.GetLessons({
            ...queryParams,
            'attachedStudents.student': id
          }))
        );
      }),
    );

  @Effect() updateAbsence$ = this.actions$
    .pipe(
      ofType<StudentActions.UpdateAbsence>(StudentActions.UPDATE_ABSENCE),
      mergeMap(({ payload }) => concat(
        of(new QueryActions.QueryInProgress(PUT_ABSENCE)),
        this.studentRepository
          .updateAbsence(payload)
          .pipe(
            mergeMap(data => concat(
              of(new QueryActions.QuerySuccess(PUT_ABSENCE, data)),
              of(new LayoutActions.ShowSnackbar(SnackbarStatus.SUCCESS, 'form.student.absence.updateSuccess')),
              of(new StudentActions.UpdateAbsenceSuccess(payload)),
            )),
            catchError(error => of(new QueryActions.QueryFailure(PUT_ABSENCE, error))),
          ),
      )),
    );

  @Effect() getAbsence$ = this.actions$
    .pipe(
      ofType<RouterNavigationAction<RouterState>>(ROUTER_NAVIGATION),
      map(({ payload: { routerState } }) => routerState),
      filter(({ url }) => startsWith(url, '/student/absences')),
      mergeMap(({ url, queryParams }) => {
        const id = getId(url);
        return concat(
          of(new QueryActions.QueryInProgress(GET_ABSENCE)),
          of(new LayoutActions.SpinnerToggle(true)),
          this.studentRepository
            .getAbsence({ ...queryParams, student: id })
            .pipe(
              mergeMap(data => concat(
                of(new QueryActions.QuerySuccess(GET_ABSENCE, data)),
                of(new StudentActions.GetAbsenceSuccess(data)),
                of(new LayoutActions.SpinnerToggle(false)),
              )),
              catchError(error => of(new QueryActions.QueryFailure(GET_ABSENCE, error))),
            ),
        );
      }),
    );

  @Effect() fetchStudents$ = this.actions$
    .pipe(
      ofType<RouterNavigationAction<RouterState>>(ROUTER_NAVIGATION),
      map(({ payload: { routerState } }) => routerState),
      filter(({ url }) => checkRouter(url, 'student')),
      mergeMap(({ url, queryParams }) => concat(
        of(new StudentActions.GetStudents(queryParams))
      )),
    );

  @Effect() deleteStudent$ = this.actions$
    .pipe(
      ofType<StudentActions.DeleteStudent>(StudentActions.DELETE_STUDENT),
      mergeMap(({ id }) => concat(
        of(new QueryActions.QueryInProgress(DELETE_STUDENT)),
        of(new LayoutActions.SpinnerToggle(true)),
        this.studentRepository
          .deleteStudent(id)
          .pipe(
            mergeMap(data => concat(
              of(new QueryActions.QuerySuccess(DELETE_STUDENT, data)),
              of(new LayoutActions.SpinnerToggle(false)),
              of(new LayoutActions.ShowSnackbar(SnackbarStatus.SUCCESS, 'form.student.deleteSuccess')),
              of(new routerActions.Navigate({ url: '/student' })),
            )),
            catchError(error => concat(
              of(new QueryActions.QueryFailure(DELETE_STUDENT, error)),
              of(new LayoutActions.SpinnerToggle(false)),
            )),
          ),
      )),
    );

  @Effect() deleteStudents$ = this.actions$
    .pipe(
      ofType<StudentActions.DeleteStudents>(StudentActions.DELETE_STUDENTS),
      mergeMap(({ queryParams }) => concat(
        of(new QueryActions.QueryInProgress(DELETE_STUDENTS)),
        of(new LayoutActions.SpinnerToggle(true)),
        this.studentRepository
          .deleteStudents(queryParams)
          .pipe(
            mergeMap(data => concat(
              of(new QueryActions.QuerySuccess(DELETE_STUDENTS, data)),
              of(new LayoutActions.ShowSnackbar(SnackbarStatus.SUCCESS, 'form.student.deleteSuccess')),
              of(new LayoutActions.SpinnerToggle(false)),
              of(new routerActions.Navigate({ url: '/student' })),
            )),
            catchError(error => concat(
              of(new LayoutActions.SpinnerToggle(false)),
              of(new QueryActions.QueryFailure(DELETE_STUDENTS, error)),
            )),
          ),
      )),
    );
}
