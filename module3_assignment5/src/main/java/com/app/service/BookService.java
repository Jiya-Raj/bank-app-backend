package com.app.service;

import com.app.dto.BookDto;

import java.util.List;

public interface BookService {
    BookDto createBook(BookDto bookDto);

    BookDto getBook(Long id);

    BookDto updateBook(Long id, BookDto bookDto);

    void deleteBook(Long id);

    List<BookDto> getAllBooks();
}
