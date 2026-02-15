package com.assignment.module4.service;

import com.assignment.module4.entity.Book;

import java.util.List;

public interface BookService {
    Book createBook(Book book);

    List<Book> getBooks();

    Book updateBook(Integer id, Book book);

    void deleteBook(Integer id);
}
