import {
  StudentState,
  initialState,
  POST_STUDENT,
  GET_STUDENT,
  PUT_STUDENT,
  GET_STUDENTS,
  DELETE_STUDENT,
  DELETE_STUDENTS,
  GET_ABSENCE,
  PUT_ABSENCE
} from './student.state';
import { queryReducer } from '../../../store/query';
import * as StudentActions from './student.actions';
import * as QueryActions from '../../../store/query/query.actions';

const queryState = (state: StudentState, action: StudentActions.All | QueryActions.All): StudentState => ({
  ...state,
  ...queryReducer<StudentState>([POST_STUDENT], action as QueryActions.All),
  ...queryReducer<StudentState>([PUT_STUDENT], action as QueryActions.All),
  ...queryReducer<StudentState>([GET_STUDENT], action as QueryActions.All),
  ...queryReducer<StudentState>([GET_STUDENTS], action as QueryActions.All),
  ...queryReducer<StudentState>([DELETE_STUDENT], action as QueryActions.All),
  ...queryReducer<StudentState>([DELETE_STUDENTS], action as QueryActions.All),
  ...queryReducer<StudentState>([GET_ABSENCE], action as QueryActions.All),
  ...queryReducer<StudentState>([PUT_ABSENCE], action as QueryActions.All),
});

export function reducer(state = initialState, action: StudentActions.All | QueryActions.All): StudentState {
  switch (action.type) {
    case StudentActions.SET_STUDENT_SUCCESS:
      return {
        ...state,
        getStudentQuery: {},
        studentSingle: action.response,
      };
    case StudentActions.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.response,
      };
    case StudentActions.CLEAR_STUDENTS:
      return {
        ...state,
        students: null,
      };
    case StudentActions.CLEAR_STUDENT:
      return {
        ...state,
        studentSingle: null,
        getStudentQuery: {}
      };
    case StudentActions.GET_ABSENCE_SUCCESS:
      return {
        ...state,
        studentAbsence: action.response,
      };
    case StudentActions.UPDATE_ABSENCE_SUCCESS:
      return {
        ...state,
        studentAbsence: {
          ...state.studentAbsence,
          data: state.studentAbsence.data
            .map(item => item.id === action.absence.id
              ? {
                ...item,
                absenceAction: action.absence.absenceAction
              }
              : item)
        },
      };
    default: {
      return queryState(state, action);
    }
  }
}
