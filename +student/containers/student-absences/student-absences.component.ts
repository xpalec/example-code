import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { NavigationSpace } from '../../../shared/model';
import { Absence, Student } from '../../model';
import { Route } from '../../../shared/components/navigation/route.model';
import { PermissionsService } from '../../../core/permissions/shared/permissions.service';
import { StudentService, studentRoutes } from '../../shared';

@Component({
  selector: 'e-student-absences',
  templateUrl: './student-absences.component.html',
  styleUrls: ['./student-absences.component.scss']
})
export class StudentAbsencesComponent implements OnInit {
  absence: Observable<Absence[]>;
  student$: Observable<Student>;
  items$: Observable<number>;
  spinnerActive$: Observable<boolean>;
  space$: Observable<NavigationSpace>;
  id: string;
  unsubscribe$ = new Subject();
  canEdit = false;
  routes: Route[];

  constructor(
    private route: ActivatedRoute,
    private permissionsService: PermissionsService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.absence = this.studentService.getAbsence();
    this.student$ = this.studentService.getStudent();
    this.items$ = this.studentService.getAbsenceTotalItems();
    this.space$ = this.route.snapshot.data.space;
    this.canEdit = this.permissionsService.hasPermissions(['student.management.edit']);
    this.id = this.route.snapshot.params.id;
    this.routes = studentRoutes;
    this.spinnerActive$ = this.studentService.getAbsenceQueryIsPending();
  }
}
