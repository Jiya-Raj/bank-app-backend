package com.app.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.app.security.CustomUserDetailsService;
import com.app.security.JwtUtil;

@Configuration
//@EnableMethodSecurity
public class SecurityConfig {

	private final CustomUserDetailsService userDetailsService;
	private final JwtUtil jwtUtil;

	public SecurityConfig(CustomUserDetailsService userDetailsService, JwtUtil jwtUtil) {
		this.userDetailsService = userDetailsService;
		this.jwtUtil = jwtUtil;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).cors(cors -> {
		}).authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
		
	//	auth.requestMatchers("/auth/login").
//		.anyRequest().authenticated())
//				.addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
//				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);

		builder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());

		return builder.build();
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**")
	                    .allowedOrigins("http://localhost:4200")
	                    .allowedMethods("*")
	                    .allowedHeaders("*");
	        }
	    };
	}

}
