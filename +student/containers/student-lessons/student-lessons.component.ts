import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { PermissionsService } from '../../../core/permissions/shared/permissions.service';
import { Route } from '../../../shared/components/navigation/route.model';
import { NavigationSpace } from '../../../shared/model';
import { studentRoutes, StudentService } from '../../shared';
import { Student } from '../../model';
import { LessonService } from '../../../+lesson/shared/lesson.service';
import { Lesson } from '../../../+lesson/model';

@Component({
  selector: 'e-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.scss']
})
export class StudentLessonsComponent implements OnInit {

  lessons$: Observable<Lesson[]>;
  items$: Observable<number>;
  student$: Observable<Student>;
  spinnerActive$: Observable<boolean>;
  space$: Observable<NavigationSpace>;
  id: string;
  unsubscribe$ = new Subject();
  isEditState = false;
  canEdit = false;
  routes: Route[];

  constructor(
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private permissionsService: PermissionsService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.spinnerActive$ = this.lessonService.getLessonsQueryIsPending();
    this.lessons$ = this.lessonService.getLessons();
    this.student$ = this.studentService.getStudent();
    this.items$ = this.lessonService.getLessonsTotalItems();
    this.space$ = this.route.snapshot.data.space;
    this.canEdit = this.permissionsService.hasPermissions(['student.management.edit']);
    this.id = this.route.snapshot.params.id;
    this.routes = studentRoutes;
  }
}
