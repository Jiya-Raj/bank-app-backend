package com.module4.assignment2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/resources")
public class LearningResourceController {

    private final List<String> resources = new ArrayList<>(List.of("Spring Security Intro", "REST API Basics"));

    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT','TEACHER')")
    public ResponseEntity<List<String>> getAll() {
        return ResponseEntity.ok(resources);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('STUDENT','TEACHER')")
    public ResponseEntity<List<String>> create(@RequestBody String resourceName) {
        resources.add(resourceName);
        return ResponseEntity.status(HttpStatus.CREATED).body(resources);
    }

    @DeleteMapping("/{index}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<Void> delete(@PathVariable int index) {
        resources.remove(index);
        return ResponseEntity.noContent().build();
    }
}
