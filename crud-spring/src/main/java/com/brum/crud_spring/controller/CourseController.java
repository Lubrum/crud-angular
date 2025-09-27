package com.brum.crud_spring.controller;

import com.brum.crud_spring.dto.CourseDTO;
import com.brum.crud_spring.dto.CousePageDTO;
import com.brum.crud_spring.service.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SuppressWarnings("unused")
@Validated
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public CousePageDTO list(
        @RequestParam(defaultValue = "0") @PositiveOrZero int page,
        @RequestParam(defaultValue = "10") @Positive @Max(10) int pageSize
    ) {
        return courseService.list(page, pageSize);
    }

    @GetMapping("/{id}")
    public CourseDTO findById(@PathVariable @NotNull @Positive final Long id) {
        return courseService.findById(id);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public CourseDTO create(@RequestBody @Valid @NotNull CourseDTO course) {
        return courseService.create(course);
    }

    @PutMapping("/{id}")
    public CourseDTO update(@PathVariable @NotNull @Positive final Long id, @RequestBody @Valid @NotNull CourseDTO course) {
        return courseService.update(id, course);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive final Long id) {
         courseService.delete(id);
    }
}
