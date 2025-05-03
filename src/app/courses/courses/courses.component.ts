import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from '../courses-routing.module';

@Component({
  standalone: true,
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  imports: [
    CommonModule,
    CoursesRoutingModule
  ]
})
export class CoursesComponent {

}
