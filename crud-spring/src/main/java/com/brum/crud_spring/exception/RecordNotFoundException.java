package com.brum.crud_spring.exception;

public class RecordNotFoundException extends RuntimeException {
    private static final long seriaVersionUID = 1L;

    public RecordNotFoundException(Long id) {
        super("Registro não encontrado com o id: " + id);
    }
}
