import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
  imports: [CommonModule, AppMaterialModule, SharedModule, ReactiveFormsModule],
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackbar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      category: [''],
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => {
        this.onError();
      }
    );
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackbar.open('Curso salvo com sucesso.', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackbar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}
