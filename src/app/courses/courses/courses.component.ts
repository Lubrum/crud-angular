import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesRoutingModule } from '../courses-routing.module';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  standalone: true,
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule
  ]
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  displayedColumns = ['name', 'category'];

  constructor(private coursesService: CoursesService){
    // this.courses = [];
    this.courses = this.coursesService.list();
  }

  ngOnInit(): void {
  }

}
