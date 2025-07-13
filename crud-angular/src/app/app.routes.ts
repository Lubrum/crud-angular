// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    // loadComponent: () => import('./courses/courses/courses.component').then(m => m.CoursesComponent),
    loadChildren: () => import('./courses/courses.routes').then(m => m.COURSES_ROUTES),
  },
];
