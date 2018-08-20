import { StudentService } from './student.service';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { StudentState, studentSelectors } from '../store';
import * as reducers from '../store/student/student.reducers';

const studentMock = {
  id: 'test',
};

describe('StudentService', () => {
  let store: Store<StudentState>;
  let studentService: StudentService;
  let result;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...reducers,
          'feature': combineReducers(reducers)
        }),
      ],
      providers: [StudentService]
    });

    store = TestBed.get(Store);
    studentService = TestBed.get(StudentService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('#getStudent should return single student data', () => {
    spyOn(studentSelectors, 'selectStudent').and.returnValue({ studentSingle: studentMock });

    const stream = studentService.getStudent();

    stream.subscribe((data) => { result = data; });
    expect(result).toEqual(studentMock);
  });

  it('#getStudents should return table of students', () => {
    spyOn(studentSelectors, 'selectStudent').and.returnValue({ students: { data: [studentMock] }});

    const stream = studentService.getStudents();

    stream.subscribe((data) => { result = data; });
    expect(result).toEqual([studentMock]);
  });

  it('#getAbsence should return frequency of students', () => {
    spyOn(studentSelectors, 'selectStudent').and.returnValue({ studentAbsence: { data: [studentMock] }});

    const stream = studentService.getAbsence();

    stream.subscribe((data) => { result = data; });
    expect(result).toEqual([studentMock]);
  });

  it('#getAbsence should return total number of absences', () => {
    spyOn(studentSelectors, 'selectStudent').and.returnValue({ studentAbsence: { totalItems: 5 }});

    const stream = studentService.getAbsenceTotalItems();

    stream.subscribe((data) => { result = data; });
    expect(result).toEqual(5);
  });

});
