import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  StudentsComponent,
  StudentEditComponent,
  StudentLessonsComponent,
  StudentAbsencesComponent,
  StudentInvoicesComponent,
} from './containers';
import { NavigationSpace, NavigationIcon } from '../shared/model';
import { StudentSingleGuard } from './shared';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    data: {
      title: 'Student',
      permissions: ['student.management'],
      space: NavigationSpace.Student,
      icon: NavigationIcon.Student
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: StudentEditComponent,
    data: {
      title: 'Create student',
      permissions: ['student.management.create'],
      space: NavigationSpace.Student,
      icon: NavigationIcon.Student
    },
  },
  {
    path: ':id',
    component: StudentEditComponent,
    canActivate: [StudentSingleGuard],
    data: {
      title: 'Edit student',
      permissions: ['student.management'],
      space: NavigationSpace.Student,
      icon: NavigationIcon.Student
    },
  },
  {
    path: 'lessons/:id',
    component: StudentLessonsComponent,
    canActivate: [StudentSingleGuard],
    data: {
      title: 'Student lessons',
      permissions: ['student.management'],
      space: NavigationSpace.Student,
      icon: NavigationIcon.Student
    },
  },
  {
    path: 'absences/:id',
    component: StudentAbsencesComponent,
    canActivate: [StudentSingleGuard],
    data: {
      title: 'Student absences',
      permissions: ['student.management'],
      space: NavigationSpace.Student,
      icon: NavigationIcon.Student
    },
  },
  {
    path: 'invoices/:id',
    component: StudentInvoicesComponent,
    canActivate: [StudentSingleGuard],
    data: {
      title: 'Student invoices',
      permissions: ['student.management'],
      space: NavigationSpace.Student,
      icon: NavigationIcon.Student
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule { }

export const routedComponents = [
  StudentsComponent,
  StudentEditComponent,
  StudentLessonsComponent,
  StudentAbsencesComponent,
  StudentInvoicesComponent,
];
