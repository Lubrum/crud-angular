package com.brum.crud_spring.controller;

import com.brum.crud_spring.model.Course;
import com.brum.crud_spring.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

    private CourseRepository courseRepository;

    @GetMapping
    public @ResponseBody List<Course> hello() {
        return courseRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody Course course) {
//        return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(course));
        return courseRepository.save(course);
    }
}
