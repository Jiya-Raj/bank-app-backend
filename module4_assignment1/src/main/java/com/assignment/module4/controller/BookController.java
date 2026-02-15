package com.assignment.module4.controller;

import com.assignment.module4.entity.Book;
import com.assignment.module4.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public Book create(@RequestBody Book book) {
        return bookService.createBook(book);
    }

    @GetMapping
    public List<Book> getAll() {
        return bookService.getBooks();
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable Integer id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        bookService.deleteBook(id);
    }
}
