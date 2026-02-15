package com.app.service;

import com.app.dto.BookDto;
import com.app.exception.BookNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class BookServiceImpl implements BookService {

    private final Map<Long, BookDto> books = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(0);

    @Override
    public BookDto createBook(BookDto bookDto) {
        long id = idGenerator.incrementAndGet();
        BookDto created = new BookDto(id, bookDto.getTitle(), bookDto.getAuthor(), bookDto.getPrice());
        books.put(id, created);
        return created;
    }

    @Override
    public BookDto getBook(Long id) {
        BookDto book = books.get(id);
        if (book == null) {
            throw new BookNotFoundException(id);
        }
        return book;
    }

    @Override
    public BookDto updateBook(Long id, BookDto bookDto) {
        BookDto existing = getBook(id);
        existing.setTitle(bookDto.getTitle());
        existing.setAuthor(bookDto.getAuthor());
        existing.setPrice(bookDto.getPrice());
        books.put(id, existing);
        return existing;
    }

    @Override
    public void deleteBook(Long id) {
        if (books.remove(id) == null) {
            throw new BookNotFoundException(id);
        }
    }

    @Override
    public List<BookDto> getAllBooks() {
        return new ArrayList<>(books.values());
    }
}
