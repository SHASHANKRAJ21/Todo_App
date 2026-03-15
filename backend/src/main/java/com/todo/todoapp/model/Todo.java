package com.todo.todoapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "todos")
@Data @NoArgsConstructor @AllArgsConstructor
public class Todo {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    private boolean completed = false;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    public void generateId() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
    }
}
