package com.todo.todoapp.dto;

import lombok.*;

@Data @AllArgsConstructor @NoArgsConstructor
public class ApiResponse<T> {
    private String success;
    private String message;
    private T data;

    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>("success", message, data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>("error", message, null);
    }
}
