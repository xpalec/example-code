import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { takeUntil, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/empty';

import { studentActions } from '../../store';
import { Student } from '../../model';
import { StudentState } from '../../store';
import { getFieldValue, dates } from '../../../../utils';
import { getStudentFields, getProfileFields, getEmergencyInfoFields } from './student-form.factory';
import { GenderOption } from '../../../core/user/model';
import { genderList } from '../../../shared/repository';
import { NavigationSpace } from '../../../shared/model';
import { StudentRepository } from '../../shared';
import { routerActions } from '../../../store/router';
import { PermissionsService } from '../../../core/permissions/shared/permissions.service';


@Component({
  selector: 'e-student-form',
  templateUrl: 'student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formData?: Student;
  @Input() pending: boolean;
  @Input() space: NavigationSpace;
  @Input() submitAction: (data: Student, space: NavigationSpace, id?: string) => studentActions.All;

  submit$ = new Subject<Student>();
  genderList: GenderOption[] = genderList;
  form: FormGroup;
  formProfile: FormGroup;
  formEmergencyInfo: FormGroup;
  id: string;
  parentId: string;
  siblings: Student[] = [];
  canEdit: boolean;
  currentDate = dates.max;
  minDate = dates.min;

  siblingsPending = true;
  siblingsDisplayedColumns = ['name', 'email', 'phone'];
  siblingsDataSource = new MatTableDataSource();

  private unsubscribe$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<StudentState>,
    private location: Location,
    private studentRepository: StudentRepository,
    private permissionsService: PermissionsService,
  ) { }

  ngOnInit() {
    this.getInitData();
    this.canEdit = this.permissionsService.hasPermissions(['student.management.edit']);

    this.getSubmitData()
      .subscribe((submitData: Student) => this.store.dispatch(this.submitAction(submitData, this.space, this.id)));
  }

  ngOnChanges(changes) {
    if (!this.pending) {
      this.getInitData();
    }
  }

  getInitData() {
    this.id = getFieldValue(this.formData, 'id');
    this.parentId = getFieldValue(this.formData, 'parent.id');
    this.formProfile = this.buildProfileForm();
    this.formEmergencyInfo = this.buildEmergencyInfoForm();
    this.form = this.buildForm();

    this.getSiblings(this.parentId)
      .subscribe((siblingsList: Student[]) => {
          this.siblingsPending = false;
          const siblings = siblingsList.filter(item => item.id !== this.id);
          this.siblings = siblings;
          this.siblingsDataSource.data = siblings;
        }
      );
  }

  onEditStudent(id: string) {
    this.formData = null;
    this.store.dispatch(new studentActions.ClearStudent());
    this.store.dispatch(new routerActions.Navigate({ url: `/student/${id}` }));
  }

  getSiblings(parentId: string): Observable<Student[]> {
    return this.formData
      ? this.studentRepository
        .getStudents({ parent: parentId })
        .pipe(
          takeUntil(this.unsubscribe$),
          map(({ data }) => data)
        )
      : Observable.empty();
  }

  getSubmitData() {
    return this.submit$.pipe(
      takeUntil(this.unsubscribe$),
      map(() => this.form.value),
    );
  }

  goBack() {
    this.location.back();
  }

  private buildForm() {
    return this.formBuilder
      .group({
        ...getStudentFields(this.formData),
        profile: this.formProfile,
        emergencyInfo: this.formEmergencyInfo,
      });
  }

  private buildProfileForm() {
    return this.formBuilder.group({
      ...getProfileFields(this.formData),
    });
  }

  private buildEmergencyInfoForm() {
    return this.formBuilder.group({
      ...getEmergencyInfoFields(this.formData),
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
