import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from '../../../store';
import { routerActions } from '../../../store/router';
import { Student } from '../../model';
import { StudentService } from '../../shared';
import { studentActions } from '../../store';
import { PermissionsService } from '../../../core/permissions/shared/permissions.service';

@Component({
  templateUrl: 'students.component.html',
  styleUrls: ['./students.component.scss'],
})

export class StudentsComponent implements OnInit, OnDestroy {
  students$: Observable<Student[]>;
  items$: Observable<number>;
  spinnerActive$: Observable<boolean>;
  canAdd: boolean;
  canDelete: boolean;
  selectedStudents: string[];
  params = new URLSearchParams();
  isActive = false;

  constructor(
    private store: Store<State>,
    private studentsService: StudentService,
    private permissionsService: PermissionsService,
  ) { }

  ngOnInit() {
    this.spinnerActive$ = this.studentsService.getStudentsQueryIsPending();
    this.students$ = this.studentsService.getStudents();
    this.items$ = this.studentsService.getStudentsTotalItems();
    this.canAdd = this.permissionsService.hasPermissions(['student.management.edit']);
    this.canDelete = this.permissionsService.hasPermissions(['student.management.delete']);
  }

  onCreate() {
    this.store.dispatch(new routerActions.Navigate({ url: '/student/create' }));
  }

  onUpdateStudents(value: Student[]) {
    this.selectedStudents = [];
    this.params = new URLSearchParams();
    value.forEach((student) => {
      this.selectedStudents.push(student.id);
      this.params.append('id[]', student.id);
    });
  }

  removeItems() {
    this.toggleDialog();
    this.store.dispatch(new studentActions.DeleteStudents(this.params));
  }

  toggleDialog() {
    this.isActive = !this.isActive;
  }

  ngOnDestroy() {
    this.studentsService.unsubscribe();
    this.store.dispatch(new studentActions.ClearStudents());
  }
}
