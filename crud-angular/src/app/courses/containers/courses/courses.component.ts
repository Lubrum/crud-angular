import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { CoursesListComponent } from '../../component/courses-list/courses-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  standalone: true,
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    CoursesListComponent,
  ],
})
export class CoursesComponent implements OnInit {
  courses$!: Observable<Course[]>;
  private refresh$ = new Subject<void>();

  constructor(
    private readonly coursesService: CoursesService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  refresh() {
    this.courses$ = this.refresh$.pipe(
      startWith(void 0), // triggers initial load
      switchMap(() =>
        this.coursesService.list().pipe(
          catchError(() => {
            this.onError('Erro ao carregar os cursos.');
            return of([]);
          })
        )
      )
    );
  }

  ngOnInit(): void {
    this.refresh();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course.id], { relativeTo: this.route });
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course.id).subscribe(
          () => {
            this.refresh$.next();
            this.snackBar.open('Curso removido com sucesso!', 'X', {
              duration: 1000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro ao tentar remover curso!')
        );
      }
    });
  }
}
