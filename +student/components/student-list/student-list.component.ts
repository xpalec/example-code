import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { SelectionModel } from '@angular/cdk/collections';

import { Student } from '../../model';
import { routerActions } from '../../../store/router';
import { State } from '../../../store';
import { NavigationSpace } from '../../../shared/model';

@Component({
  selector: 'e-student-list',
  templateUrl: 'student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnChanges {
  @Input() students: Student[];
  @Input() pending: boolean;
  @Input() canDelete: boolean;
  @Input() space: NavigationSpace;
  @Output() selectedStudents: EventEmitter<Student[]> = new EventEmitter();
  displayedColumns = this.buildTable(this.canDelete);
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Student>(true, []);

  constructor(private store: Store<State>) { }

  ngOnChanges() {
    this.dataSource.data = [];
    this.dataSource.data = this.students;
    this.displayedColumns = this.buildTable(this.canDelete);
    this.selection.clear();

    setTimeout(() => this.onUpdateStudents(), 0);
  }

  onEditStudent(id: string) {
    this.store.dispatch(new routerActions.Navigate({ url: `/student/${id}` }));
  }

  buildTable(admin: boolean) {
    return [
      ...(admin ? ['checkbox'] : []), 'name', 'email', 'phone', 'parent', 'actions'
    ];
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isEmptyResult() {
    return !this.students || !this.students.length;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(student => this.selection.select(student));

    this.onUpdateStudents();
  }

  toggleSelect(student: Student) {
    this.selection.toggle(student);

    this.onUpdateStudents();
  }

  onUpdateStudents() {
    this.selectedStudents.emit(this.selection.selected);
  }
}
