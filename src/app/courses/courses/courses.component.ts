import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { CoursesRoutingModule } from '../courses-routing.module';
import { Course } from '../model/course';

@Component({
  standalone: true,
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatTableModule
  ]
})
export class CoursesComponent {

  courses: Course[] = [
    { _id: '1', name: 'Angular', category: 'front-end' }
  ];
  displayedColumns = ['name', 'category'];

  constructor(){
    // this.courses = [];
  }

  ngOnInit(): void {
  }

}
