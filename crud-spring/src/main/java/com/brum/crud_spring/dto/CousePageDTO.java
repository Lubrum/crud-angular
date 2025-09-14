package com.brum.crud_spring.dto;

import java.util.List;

public record CousePageDTO (
    List<CourseDTO> courses,
    int page,
    int size,
    long totalElements,
    int totalPages
){ }
