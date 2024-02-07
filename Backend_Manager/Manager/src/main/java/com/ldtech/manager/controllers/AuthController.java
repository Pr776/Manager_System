package com.ldtech.manager.controllers;

import com.ldtech.manager.dtos.LoginDto;
import com.ldtech.manager.dtos.SignUpDto;
import com.ldtech.manager.entities.Role;
import com.ldtech.manager.entities.User;
import com.ldtech.manager.repositories.RoleRepository;
import com.ldtech.manager.repositories.UserRepository;
import com.ldtech.manager.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto){
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

//             get token form tokenProvider
            String token = tokenProvider.generateToken(authentication);

            return ResponseEntity.ok(token);

//            return new ResponseEntity<>("User Signed in Successfully!!!", HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Authentication failed: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto){

        // Checking email exists in the database or not
        if(userRepository.existsByEmail(signUpDto.getEmail())){
            System.out.println(passwordEncoder.encode(signUpDto.getPassword()));
            return new ResponseEntity<>("Email is already taken!!!", HttpStatus.BAD_REQUEST);
        }

        // Creating new user
        User user = new User();
        user.setEmail(signUpDto.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));


//        Role roles = roleRepository.findByName("USER").get();
//
//        user.setRoles(Collections.singleton(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully!!!", HttpStatus.OK);


    }
}
