package com.app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BookAopIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void createAndGetBook_shouldSucceed() throws Exception {
        String payload = """
                {
                  \"title\": \"Clean Code\",
                  \"author\": \"Robert C. Martin\",
                  \"price\": 700
                }
                """;

        mockMvc.perform(post("/api/books")
                        .header("X-USER", "tester")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.title").value("Clean Code"));

        mockMvc.perform(get("/api/books/1").header("X-USER", "tester"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.author").value("Robert C. Martin"));
    }

    @Test
    void createBook_withoutXUser_shouldFail() throws Exception {
        String payload = """
                {
                  \"title\": \"Domain-Driven Design\",
                  \"author\": \"Eric Evans\",
                  \"price\": 900
                }
                """;

        mockMvc.perform(post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Missing required header: X-USER"));
    }

    @Test
    void createBook_withInvalidPayload_shouldFailValidation() throws Exception {
        String payload = """
                {
                  \"title\": \"\",
                  \"author\": \"Unknown\",
                  \"price\": -10
                }
                """;

        mockMvc.perform(post("/api/books")
                        .header("X-USER", "tester")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Title must not be empty"));
    }

    @Test
    void getBook_whenNotFound_shouldReturn404() throws Exception {
        mockMvc.perform(get("/api/books/999").header("X-USER", "tester"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Book not found with id: 999"));
    }
}
