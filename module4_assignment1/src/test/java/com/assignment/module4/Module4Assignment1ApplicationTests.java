package com.assignment.module4;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class Module4Assignment1ApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void studentCannotDeleteBook() throws Exception {
        mockMvc.perform(delete("/api/books/1")
                        .with(SecurityMockMvcRequestPostProcessors.httpBasic("student", "student123")))
                .andExpect(status().isForbidden());
    }

    @Test
    void teacherCanCreateBook() throws Exception {
        mockMvc.perform(post("/api/books")
                        .with(SecurityMockMvcRequestPostProcessors.httpBasic("teacher", "teacher123"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Clean Code\",\"author\":\"Robert C. Martin\"}"))
                .andExpect(status().isOk());
    }
}
