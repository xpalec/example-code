import { Component, Input, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { convertedDate, dateFormat, getPrice } from '../../../../utils';
import { MatTableDataSource } from '@angular/material';
import { routerActions } from '../../../store/router';
import { NavigationSpace } from '../../../shared/model';
import { State } from '../../../store';
import { Absence, absenceAction } from '../../model';
import * as studentActions from '../../store/student/student.actions';

@Component({
  selector: 'e-student-absencelist',
  templateUrl: './student-absencelist.component.html',
  styleUrls: ['./student-absencelist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentAbsencelistComponent implements OnInit, OnChanges {

  @Input() absence: Absence[];
  @Input() pending: boolean;
  @Input() space: NavigationSpace;
  displayedColumns = ['status', 'category', 'lesson', 'teacher', 'date', 'time', 'price', 'actions'];
  dataSource = new MatTableDataSource();
  absenceAction = absenceAction;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.dataSource.data = this.absence;
  }

  ngOnChanges() {
    this.dataSource.data = this.absence;
  }

  nomakeup(absence) {
    this.onUpdateAbsence(absence.id, this.absenceAction.Charge);
  }

  onUpdateAbsence(id: string, value: string) {
    this.store.dispatch(new studentActions.UpdateAbsence({
      id: id,
      absenceAction: value
    }));
  }

  getTime(timestamp: number) {
    return convertedDate(timestamp, dateFormat.time);
  }

  getDate(timestamp: number) {
    return convertedDate(timestamp, dateFormat.date);
  }

  getPrice(price: number) {
    return getPrice(price, 2);
  }

  onAssignLesson(attachedStudent: string, student: string) {
    this.store.dispatch(new routerActions.Navigate(
      { url: '/', queryParams: { attachedStudent, redirect: `/student/absences/${student}` } }));
  }

  onCreateLesson(attachedStudent: string, student: string) {
    this.store.dispatch(new routerActions.Navigate(
      {
        url: '/lesson/create-makeup',
        queryParams: { student, attachedStudent, redirect: `/student/absences/${student}` }
      })
    );
  }

  onEditLesson(id: string, studentId: string) {
    this.store.dispatch(new routerActions.Navigate({
      url: `/lesson/${id}`,
      queryParams: { redirect: `/student/absences/${studentId}` }
    }));
  }

  isEmptyResult() {
    return !this.absence || !this.absence.length;
  }

  showAbsenceActions(action: absenceAction) {
    return action === this.absenceAction.None;
  }

  isMakeupStatus(action: absenceAction) {
    return action === this.absenceAction.NoCharge || action === this.absenceAction.Charge;
  }

}
