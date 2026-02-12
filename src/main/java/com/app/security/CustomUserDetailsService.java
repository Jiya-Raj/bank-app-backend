package com.app.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.entities.User;
import com.app.repo.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	private final UserRepo userRepo;
	
	public CustomUserDetailsService(UserRepo userRepo) {
		this.userRepo=userRepo;
	}
	
	@Override
	public UserDetails  loadUserByUsername(String username) {
		User user =userRepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("User not found"));
		
		return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
	}

}
