import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  standalone: true,
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AppMaterialModule, SharedModule],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private readonly coursesService: CoursesService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os cursos.')
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
    console.log('onAdd');
  }
}
