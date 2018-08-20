import { Route } from '../../shared/components/navigation/route.model';

enum StudentSpace {
  Information = 'information',
  Lessons = 'lessons',
  Absences = 'absences',
  Invoices = 'invoices',
}

export const studentRoutes: Route[] =
  [
    {
      title: 'form.student.information',
      path: `/student/`,
      type: StudentSpace.Information,
    },
    {
      title: 'form.student.lessons',
      path: `/student/lessons/`,
      type: StudentSpace.Lessons,
    },
    {
      title: 'form.student.absences',
      path: `/student/absences/`,
      type: StudentSpace.Absences,
    },
    {
      title: 'form.student.invoices',
      path: `/student/invoices/`,
      type: StudentSpace.Invoices,
      restricted: true
    },
  ];


