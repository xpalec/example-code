import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Lesson, LessonFrequency } from '../../../+lesson/model';
import { convertedDate, dateFormat, getPrice } from '../../../../utils';
import { MatTableDataSource } from '@angular/material';
import { routerActions } from '../../../store/router';
import { Store } from '@ngrx/store';
import { NavigationSpace } from '../../../shared/model';
import { State } from '../../../store';

@Component({
  selector: 'e-student-lessonlist',
  templateUrl: './student-lessonlist.component.html',
  styleUrls: ['./student-lessonlist.component.scss']
})
export class StudentLessonlistComponent implements OnInit, OnChanges {

  @Input() lessons: Lesson[];
  @Input() pending: boolean;
  @Input() space: NavigationSpace;
  displayedColumns = ['category', 'lesson', 'teacher', 'date', 'time', 'price', 'makeup'];
  dataSource = new MatTableDataSource();
  currentPath: string;

  constructor(
    private store: Store<State>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataSource.data = this.lessons;
    this.currentPath = this.router.routerState.snapshot.url;
  }

  ngOnChanges() {
    this.dataSource.data = this.lessons;
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

  getFrequency(frequency: LessonFrequency) {
    return frequency ? `lesson.frequency.${frequency}` : '-';
  }

  onEditLesson(id: string) {
    this.store.dispatch(new routerActions.Navigate({
      url: `/lesson/${id}`,
      queryParams: { redirect: this.currentPath }
    }));
  }

  isEmptyResult() {
    return !this.lessons || !this.lessons.length;
  }

}
