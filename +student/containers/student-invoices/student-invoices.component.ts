import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { StudentService, studentRoutes } from '../../shared';
import { PermissionsService } from '../../../core/permissions/shared/permissions.service';
import { Route } from '../../../shared/components/navigation/route.model';
import { NavigationSpace } from '../../../shared/model';
import { PaymentService } from '../../../+payment/shared/payment.service';
import { Invoice } from '../../../+payment/model';
import { Student } from '../../model';
import { FilterOptions } from '../../../shared/components/filter/filters/filters.repository';

@Component({
  selector: 'e-student-invoices',
  templateUrl: './student-invoices.component.html',
  styleUrls: ['./student-invoices.component.scss']
})
export class StudentInvoicesComponent implements OnInit {

  invoices$: Observable<Invoice[]>;
  student$: Observable<Student>;
  spinnerActive$: Observable<boolean>;
  items$: Observable<number>;
  space$: Observable<NavigationSpace>;
  id: string;
  unsubscribe$ = new Subject();
  isEditState = false;
  canEdit = false;
  routes: Route[];
  options = FilterOptions.METHODS;

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private permissionsService: PermissionsService,
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.student$ = this.studentService.getStudent();
    this.invoices$ = this.paymentService.getInvoices();
    this.items$ = this.paymentService.getInvoicesTotalItems();
    this.space$ = this.route.snapshot.data.space;
    this.canEdit = this.permissionsService.hasPermissions(['student.management.edit']);
    this.id = this.route.snapshot.params.id;
    this.routes = studentRoutes;
    this.spinnerActive$ = this.paymentService.getInvoicesQueryIsPending();
  }
}
