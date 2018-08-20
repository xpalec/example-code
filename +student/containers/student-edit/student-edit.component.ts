import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { StudentService, studentRoutes } from '../../shared';
import { studentActions } from '../../store';
import { Student } from '../../model';
import { NavigationSpace } from '../../../shared/model';
import { Route } from '../../../shared/components/navigation/route.model';
import { State } from '../../../store';
import { PermissionsService } from '../../../core/permissions/shared/permissions.service';

@Component({
  templateUrl: 'student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent implements OnInit, OnDestroy {
  isStudentPending$: Observable<boolean>;
  isAbsencesPending$: Observable<boolean>;
  formData$: Observable<Student>;
  space: Observable<NavigationSpace>;
  id: string;
  unsubscribe$ = new Subject();
  isEditState = false;
  canEdit = false;
  canDelete = false;
  routes: Route[];
  isActive = false;

  constructor(
    private store: Store<State>,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private permissionsService: PermissionsService,
  ) { }

  static submitAction(data: Student): studentActions.CreateStudent {
    return new studentActions.CreateStudent(data);
  }

  ngOnInit() {
    this.isStudentPending$ = this.studentService.studentQueryIsPending();
    this.isAbsencesPending$ = this.studentService.getAbsenceQueryIsPending();
    this.space = this.route.snapshot.data.space;
    this.canDelete = this.permissionsService.hasPermissions(['student.management.delete']);
    this.canEdit = this.permissionsService.hasPermissions(['student.management.edit']);
    this.editStudent();
  }

  editStudent() {
    this.id = this.route.snapshot.params.id;

    if (this.id) {
      this.routes = studentRoutes;
      this.formData$ = this.studentService.getStudent();
      this.isEditState = true;
    }
  }

  removeItems() {
    this.toggleDialog();
    this.store.dispatch(new studentActions.DeleteStudent(this.id));
  }

  submitAction(data: Student, space: NavigationSpace, id: string): studentActions.EditStudent | studentActions.CreateStudent {
    return id
      ? new studentActions.EditStudent(id, space, data)
      : new studentActions.CreateStudent(data);
  }

  toggleDialog() {
    this.isActive = !this.isActive;
  }

  ngOnDestroy() {
    this.studentService.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
