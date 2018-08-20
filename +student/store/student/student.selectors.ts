import { createFeatureSelector } from '@ngrx/store';
import { StudentState } from './student.state';

export const studentSelectors = {
  selectStudent: createFeatureSelector<StudentState>('student'),
};
