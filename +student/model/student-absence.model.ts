import { Lesson } from '../../+lesson/model';
import { Student } from './student.model';
import { QueryList } from '../../store/query';

export enum absenceAction {
  None = 'none',
  Makeup = 'make_up',
  Charge = 'charge',
  NoCharge = 'no_charge'
}

export interface Absence {
  id: string;
  absenceAction: string;
  editable: boolean;
  disabled: boolean;
  presence: string;
  student: Student;
  lesson: Lesson;
}

export type Absences = QueryList<Absence[]>;
