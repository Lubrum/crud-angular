package com.brum.crud_spring.service;

import com.brum.crud_spring.dto.CourseDTO;
import com.brum.crud_spring.dto.mapper.CourseMapper;
import com.brum.crud_spring.exception.RecordNotFoundException;
import com.brum.crud_spring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    public List<CourseDTO> list() {
        return courseRepository.findAll().stream().map(courseMapper::toDto).toList();
    }

    public CourseDTO findById(@NotNull @Positive final Long id) {
        return courseRepository.findById(id).map(courseMapper::toDto).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseDTO create(@Valid @NotNull CourseDTO course) {
        return courseMapper.toDto(courseRepository.save(courseMapper.toEntity(course)));
    }

    public CourseDTO update(@NotNull @Positive final Long id, @Valid @NotNull CourseDTO course) {
        return courseRepository.findById(id)
            .map(c -> {
                c.setName(course.name());
                c.setCategory(courseMapper.convertCategoryValue(course.category()));
                return courseMapper.toDto(courseRepository.save(c));
            }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive final Long id) {
        courseRepository.delete(courseRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
