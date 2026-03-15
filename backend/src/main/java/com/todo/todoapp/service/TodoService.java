package com.todo.todoapp.service;

import com.todo.todoapp.dto.TodoRequest;
import com.todo.todoapp.exception.AppException;
import com.todo.todoapp.model.Todo;
import com.todo.todoapp.model.User;
import com.todo.todoapp.repository.TodoRepository;
import com.todo.todoapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoService(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    public List<Todo> getTodos(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new AppException("User not found", 404));
        return todoRepository.findByUser_Id(userId);
    }

    public Todo createTodo(Long userId, TodoRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException("User not found", 404));

        String title = request.getTitle().trim();
        if (title.isEmpty()) {
            throw new AppException("Task title is required", 400);
        }

        Todo todo = new Todo();
        todo.setTitle(title);
        todo.setCompleted(false);
        todo.setUser(user);
        return todoRepository.save(todo);
    }

    public Todo toggleTodo(String id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new AppException("Task not found", 404));
        todo.setCompleted(!todo.isCompleted());
        return todoRepository.save(todo);
    }

    public void deleteTodo(String id) {
        if (!todoRepository.existsById(id)) {
            throw new AppException("Task not found", 404);
        }
        todoRepository.deleteById(id);
    }
}
