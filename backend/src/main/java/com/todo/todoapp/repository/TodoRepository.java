package com.todo.todoapp.repository;

import com.todo.todoapp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, String> {
    List<Todo> findByUser_Id(Long userId);
}
