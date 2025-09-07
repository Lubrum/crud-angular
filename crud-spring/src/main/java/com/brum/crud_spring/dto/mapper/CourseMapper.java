package com.brum.crud_spring.dto.mapper;

import com.brum.crud_spring.dto.CourseDTO;
import com.brum.crud_spring.enums.Category;
import com.brum.crud_spring.model.Course;

public class CourseMapper {
    public CourseDTO toDto(Course course) {
        if (course == null) {
            return null;
        }
        return new CourseDTO(course.getId(), course.getName(), course.getCategory().getValue());
    }

    public Course toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }

        Course course = new Course();
        if (courseDTO.id() != null) {
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        course.setCategory(convertCategoryValue(courseDTO.category()));
        return course;
    }

    public Category convertCategoryValue(String value) {
        if (value == null) {
            return null;
        }
        return switch (value) {
            case "Back-end" -> Category.BACK_END;
            case "Front-end" -> Category.FRONT_END;
            default -> throw new IllegalArgumentException("Categoria inválida: " + value);
        };
    }
}
