import { Action } from '@ngrx/store';
import { Params } from '@angular/router';
import { Absences, Student, Students } from '../../model';
import { NavigationSpace } from '../../../shared/model';

export const CREATE_STUDENT = '[Student] CREATE_STUDENT';
export const DELETE_STUDENT = '[Student] DELETE_STUDENT';
export const DELETE_STUDENTS = '[Student] DELETE_STUDENTS';
export const EDIT_STUDENT = '[Student] STUDENT_STUDENT';
export const SET_STUDENT = '[Student] SET_STUDENT';
export const SET_STUDENT_SUCCESS = '[Student] SET_STUDENT_SUCCESS';
export const CLEAR_STUDENT = '[Student] CLEAR_STUDENT';
export const GET_STUDENTS = '[Student] GET_STUDENTS';
export const GET_STUDENTS_SUCCESS = '[Student] GET_STUDENTS_SUCCESS';
export const CLEAR_STUDENTS = '[Student] CLEAR_STUDENTS';
export const GET_ABSENCE = '[Student] GET_ABSENCE';
export const GET_ABSENCE_SUCCESS = '[Student] GET_ABSENCE_SUCCESS';
export const CLEAR_ABSENCE = '[Student] CLEAR_ABSENCE';
export const UPDATE_ABSENCE = '[Student] UPDATE_ABSENCE';
export const UPDATE_ABSENCE_SUCCESS = '[Student] UPDATE_ABSENCE_SUCCESS';

export class CreateStudent implements Action {
  readonly type = CREATE_STUDENT;

  constructor(public profile: Student) { }
}

export class DeleteStudent implements Action {
  readonly type = DELETE_STUDENT;

  constructor(
    public id: string,
  ) { }
}

export class DeleteStudents implements Action {
  readonly type = DELETE_STUDENTS;

  constructor(
    public queryParams: Params,
  ) { }
}

export class EditStudent implements Action {
  readonly type = EDIT_STUDENT;

  constructor(
    public id: string,
    public space: NavigationSpace,
    public profile: Student,
  ) { }
}

export class SetStudent implements Action {
  readonly type = SET_STUDENT;

  constructor(public id: string) { }
}

export class SetStudentSuccess implements Action {
  readonly type = SET_STUDENT_SUCCESS;

  constructor(public response: Student) { }
}

export class ClearStudent implements Action {
  readonly type = CLEAR_STUDENT;

  constructor() { }
}

export class GetStudents implements Action {
  readonly type = GET_STUDENTS;

  constructor(public queryParams: Params) { }
}

export class GetStudentsSuccess implements Action {
  readonly type = GET_STUDENTS_SUCCESS;

  constructor(public response: Students) { }
}

export class ClearStudents implements Action {
  readonly type = CLEAR_STUDENTS;

  constructor() { }
}

export class GetAbsence implements Action {
  readonly type = GET_ABSENCE;

  constructor(public queryParams: Params) { }
}

export class GetAbsenceSuccess implements Action {
  readonly type = GET_ABSENCE_SUCCESS;

  constructor(public response: Absences) { }
}

export class ClearAbsence implements Action {
  readonly type = CLEAR_ABSENCE;

  constructor() { }
}

export class UpdateAbsence implements Action {
  readonly type = UPDATE_ABSENCE;

  constructor(public payload: { id: string, absenceAction: string }) { }
}

export class UpdateAbsenceSuccess implements Action {
  readonly type = UPDATE_ABSENCE_SUCCESS;

  constructor(public absence: { id: string, absenceAction: string }) { }
}

export type All =
  | CreateStudent
  | DeleteStudent
  | DeleteStudents
  | EditStudent
  | SetStudent
  | SetStudentSuccess
  | GetStudents
  | GetStudentsSuccess
  | ClearStudents
  | ClearStudent
  | GetAbsence
  | GetAbsenceSuccess
  | ClearAbsence
  | UpdateAbsence
  | UpdateAbsenceSuccess;
