package com.todo.todoapp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todoapp.dto.ApiResponse;
import com.todo.todoapp.dto.TodoRequest;
import com.todo.todoapp.model.Todo;
import com.todo.todoapp.service.TodoService;

import jakarta.validation.Valid;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    // GET /todos/{userId}
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<List<Todo>>> getTodos(@PathVariable Long userId) {
        List<Todo> todos = todoService.getTodos(userId);
        return ResponseEntity.ok(ApiResponse.ok("Tasks fetched successfully", todos));
    }

    // POST /todos/{userId}
    @PostMapping("/{userId}")
    public ResponseEntity<ApiResponse<Todo>> createTodo(
            @PathVariable Long userId,
            @Valid @RequestBody TodoRequest request) {
        Todo todo = todoService.createTodo(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Task created successfully", todo));
    }

    // PATCH /todos/{id}/toggle  (kept for completeness)
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<ApiResponse<Todo>> toggleTodo(@PathVariable String id) {
        Todo todo = todoService.toggleTodo(id);
        return ResponseEntity.ok(ApiResponse.ok("Task updated successfully", todo));
    }

    // DELETE /todos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTodo(@PathVariable String id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok(ApiResponse.ok("Task removed successfully", null));
    }
}
