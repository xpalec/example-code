import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';
import { AuthInterceptorProvider } from '../core/auth/shared/auth.interceptor';
import { studentStoreModule, studentEffectsModule, initialStateProvider, reducerProvider } from './store';
import {
  StudentsComponent,
  StudentEditComponent,
  StudentLessonsComponent,
  StudentAbsencesComponent,
  StudentInvoicesComponent
} from './containers';
import {
  StudentListComponent,
  StudentFormComponent,
  StudentLessonlistComponent,
  StudentAbsencelistComponent,
} from './components';
import { StudentService, StudentRepository, StudentSingleGuard } from './shared';
import { TranslateModule } from '@ngx-translate/core';
import { ParentRepository } from '../+parent/shared';
import { PermissionsService } from '../core/permissions/shared/permissions.service';
import { PaymentModule } from '../+payment/payment.module';
import { LessonModule } from '../+lesson/lesson.module';

const modules = [
  SharedModule,
  StudentRoutingModule,
  studentStoreModule,
  studentEffectsModule,
  TranslateModule,
  PaymentModule,
  LessonModule,
];

const components = [
  StudentsComponent,
  StudentEditComponent,
  StudentListComponent,
  StudentFormComponent,
  StudentLessonsComponent,
  StudentAbsencesComponent,
  StudentInvoicesComponent,
  StudentLessonlistComponent,
  StudentAbsencelistComponent,
];

const providers = [
  reducerProvider,
  initialStateProvider,
  AuthInterceptorProvider,
  StudentService,
  StudentRepository,
  StudentSingleGuard,
  ParentRepository,
  PermissionsService,
];

@NgModule({
  imports: [...modules],
  declarations: [...components],
  providers: [...providers],
})

export class StudentModule {}
