import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Absences, Student, Students } from '../model';
import { Absence } from '../../+lesson/model';
import { decodeQueryParams } from '../../../utils';

@Injectable()
export class StudentRepository {
  constructor(private http: HttpClient) {
  }

  deleteStudent(id: string): Observable<Student> {
    return this.http
      .delete(`${environment.apiUrl}/students/${id}`)
      .pipe(catchError((error: Response) => Observable.throw(error || 'Server error')));
  }

  deleteStudents(queryParams: Params): Observable<Student[]> {
    const query = decodeQueryParams(queryParams);

    return this.http
      .delete(`${environment.apiUrl}/students?${query}`)
      .pipe(catchError((error: Response) => Observable.throw(error || 'Server error')));
  }

  postStudent(data: Student): Observable<Student> {
    return this.http
      .post(`${environment.apiUrl}/students`, data)
      .pipe(catchError((error: Response) => Observable.throw(error || 'Server error')));
  }

  putStudent(id: string, data: Student): Observable<Student> {
    return this.http
      .put(`${environment.apiUrl}/students/${id}`, data)
      .pipe(catchError((error: Response) => Observable.throw(error || 'Server error')));
  }

  getStudent(id: string): Observable<Student> {
    return this.http
      .get(`${environment.apiUrl}/students/${id}`)
      .pipe(catchError((error: Response) => Observable.throw(error || 'Server error')));
  }

  getStudents(queryParams: Params): Observable<Students> {
    return this.http
      .get(`${environment.apiUrl}/students`, {
        params: {
          ...queryParams,
        }
      })
      .pipe(catchError((error: Response) => Observable.throw(error || 'Server error')));
  }

  updateAbsence({ id, absenceAction }): Observable<Absence> {
    return this.http
      .put(`${environment.apiUrl}/attached_students/${id}/absence`, { absenceAction: absenceAction })
      .pipe(catchError((error: Response) => Observable.throw(error || 'Server error')));
  }

  getAbsence(queryParams: Params): Observable<Absences> {
    return this.http
      .get(`${environment.apiUrl}/attached_students`, {
        params: {
          ...queryParams,
          presence: 'absent'
        }
      })
      .pipe(catchError((error: Response) => Observable.throw(error || 'Server error')));
  }
}
