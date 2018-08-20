import { InjectionToken } from '@angular/core';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { INITIAL_STATE } from '@ngrx/store';
import { StudentState, initialState, StudentEffects, reducer, studentSelectors } from './student';
import * as studentActions from './student/student.actions';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<StudentState>>('student.reducer');

function getReducer() {
  return reducer;
}

function getInitialState() {
  return initialState;
}

const reducerProvider = {
  provide: REDUCER_TOKEN,
  useFactory: getReducer,
};

const initialStateProvider = {
  provide: INITIAL_STATE,
  useFactory: getInitialState,
};

const studentStoreModule = [
  StoreModule.forFeature('student', REDUCER_TOKEN, { initialState }),
];

const studentEffectsModule = [
  EffectsModule.forFeature([StudentEffects]),
];

export {
  studentActions,
  studentSelectors,
  StudentState,
  StudentEffects,
  initialState,
  studentStoreModule,
  studentEffectsModule,
  reducerProvider,
  initialStateProvider,
  getReducer,
  getInitialState,
};
