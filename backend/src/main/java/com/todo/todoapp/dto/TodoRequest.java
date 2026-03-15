package com.todo.todoapp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class TodoRequest {
    @NotBlank(message = "Task title is required")
    private String title;
}
