package com.module4.assignment2.service;

import com.module4.assignment2.model.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class InMemoryUserDetailsService {

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        return new InMemoryUserDetailsManager(
                User.withUsername("student1")
                        .password(passwordEncoder.encode("student123"))
                        .roles(Role.STUDENT.name())
                        .build(),
                User.withUsername("teacher1")
                        .password(passwordEncoder.encode("teacher123"))
                        .roles(Role.TEACHER.name())
                        .build()
        );
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
