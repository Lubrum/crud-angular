package com.brum.crud_spring.service;

import com.brum.crud_spring.dto.CourseDTO;
import com.brum.crud_spring.dto.CousePageDTO;
import com.brum.crud_spring.dto.mapper.CourseMapper;
import com.brum.crud_spring.exception.RecordNotFoundException;
import com.brum.crud_spring.model.Course;
import com.brum.crud_spring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    public CousePageDTO list(@PositiveOrZero int pageNumber, @Positive @Max(10) int size) {
        final Page<Course> page = courseRepository.findAll(PageRequest.of(pageNumber, size));
        final List<CourseDTO> courses = page.get().map(courseMapper::toDto).toList();
        return new CousePageDTO(
            courses,
            page.getNumber(),
            page.getSize(),
            page.getTotalElements(),
            page.getTotalPages()
        );
    }

//    public List<CourseDTO> list() {
//        return courseRepository.findAll().stream().map(courseMapper::toDto).toList();
//    }

    public CourseDTO findById(@NotNull @Positive final Long id) {
        return courseRepository.findById(id).map(courseMapper::toDto).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseDTO create(@Valid @NotNull CourseDTO course) {
        return courseMapper.toDto(courseRepository.save(courseMapper.toEntity(course)));
    }

    public CourseDTO update(@NotNull @Positive final Long id, @Valid @NotNull CourseDTO courseDTO) {
        return courseRepository.findById(id)
            .map(c -> {
                Course course = courseMapper.toEntity(courseDTO);
                c.setName(courseDTO.name());
                c.setCategory(courseMapper.convertCategoryValue(courseDTO.category()));
//                c.setLessons(course.getLessons());
                c.getLessons().clear();
                course.getLessons().forEach(c.getLessons()::add);
                return courseMapper.toDto(courseRepository.save(c));
            }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive final Long id) {
        courseRepository.delete(courseRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
