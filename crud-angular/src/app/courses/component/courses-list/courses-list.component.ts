import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
  imports: [CommonModule, AppMaterialModule, SharedModule],
})
export class CoursesListComponent implements OnInit {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  onAdd() {
    // this.router.navigate(['new'], { relativeTo: this.route });
    this.add.emit(true);
  }

  onEdit(course: Course) {
    this.edit.emit(course);
  }

  onDelete(course: Course) {
    this.remove.emit(course);
  }
}
