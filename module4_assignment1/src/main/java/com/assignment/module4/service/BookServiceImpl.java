package com.assignment.module4.service;

import com.assignment.module4.entity.Book;
import com.assignment.module4.repository.BookRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    @PreAuthorize("hasAnyRole('STUDENT','TEACHER')")
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    @PreAuthorize("hasAnyRole('STUDENT','TEACHER')")
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @Override
    @PreAuthorize("hasAnyRole('STUDENT','TEACHER')")
    public Book updateBook(Integer id, Book book) {
        Book existing = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + id));
        existing.setTitle(book.getTitle());
        existing.setAuthor(book.getAuthor());
        return bookRepository.save(existing);
    }

    @Override
    @PreAuthorize("hasRole('TEACHER')")
    public void deleteBook(Integer id) {
        bookRepository.deleteById(id);
    }
}
