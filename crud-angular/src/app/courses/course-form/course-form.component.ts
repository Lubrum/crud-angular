import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  standalone: true,
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
  imports: [CommonModule, AppMaterialModule, SharedModule, ReactiveFormsModule]
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackbar: MatSnackBar) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    })
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
    this.service.save(this.form.value).subscribe(result => console.log(result), error => { this.onError()});
  }

  onCancel() {

  }

  private onError() {
    this.snackbar.open('Erro ao salvar curso.', '', { duration: 5000})
  }
}
