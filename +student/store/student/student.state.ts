import { Query } from '../../../store/query';
import { Student, Students, Absence, Absences } from '../../model';

export const POST_STUDENT = 'postStudentQuery';
export const PUT_STUDENT = 'putStudentQuery';
export const GET_STUDENT = 'getStudentQuery';
export const GET_STUDENTS = 'getStudentsQuery';
export const DELETE_STUDENT = 'deleteStudentQuery';
export const DELETE_STUDENTS = 'deleteStudentsQuery';
export const GET_ABSENCE = 'getAbsenceQuery';
export const PUT_ABSENCE = 'putAbsenceQuery';

export interface StudentState {
  postStudentQuery: Query<Student>;
  putStudentQuery: Query<Student>;
  getStudentQuery: Query<Student>;
  getStudentsQuery: Query<Student>;
  deleteStudentQuery: Query<Student>;
  deleteStudentsQuery: Query<Student>;
  getAbsenceQuery: Query<Absence>;
  putAbsenceQuery: Query<Absence>;
  studentSingle?: Student;
  students?: Students;
  studentAbsence?: Absences;
}

export const initialState: StudentState = {
  postStudentQuery: {},
  putStudentQuery: {},
  getStudentQuery: {},
  getStudentsQuery: {},
  deleteStudentQuery: {},
  deleteStudentsQuery: {},
  getAbsenceQuery: {},
  putAbsenceQuery: {},
};
