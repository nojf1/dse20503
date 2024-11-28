package com.example.dse20503_project.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.dse20503_project.entity.User;
import com.example.dse20503_project.service.UserService;
import com.example.dse20503_project.util.ChangePasswordRequest;
import com.example.dse20503_project.util.JwtUtil;
import com.example.dse20503_project.util.LoginRequest;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/users")
public class UserController {

    private UserService userService;
    private JwtUtil jwtUtil;
    private AuthenticationManager authenticationManager;

    public UserController(UserService userService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    // Endpoint for registering a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        // Try to register the user, return a response entity with the result
        try {
            userService.registerUser(user);
            return new ResponseEntity<>("Registration successful", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST); // Return 400 Bad Request status code
        }
    }

    // Endpoint for getting all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    // Endpoint for getting a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(userService.getUserById(id).orElse(null), HttpStatus.OK);
    }

    // Endpoint for getting a user by username
    @GetMapping("/username")
    public ResponseEntity<User> getUserByUsername(String username) {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint for updating user roles
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/role")
    public ResponseEntity<User> updateUserRole(@RequestBody User userDetails) {
        User updatedUser = userService.updateUserRole(userDetails.getId(), userDetails.getRole());
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // Endpoint for deleting a user
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>("User deleted", HttpStatus.OK);
    }

    // Endpoint for logging in a user
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        try {
            // Authenticate the user
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            // Load user details and generate JWT token
            final UserDetails userDetails = userService.loadUserByUsername(username);
            final User user = userService.getUserByUsername(username);
            final String jwt = jwtUtil.generateToken(userDetails, user.getId());

            // Create a response body with the token
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("token", jwt);

            // Return the JWT token in a JSON object
            return ResponseEntity.ok(responseBody); // Return 200 OK status code

        } catch (AuthenticationException e) {
            return new ResponseEntity<>(Collections.singletonMap("error", "Invalid username or password"),
                    HttpStatus.UNAUTHORIZED); // Return 401 Unauthorized
        }
    }

    // Endpoint for getting the current user's profile
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUserByUsername(userDetails.getUsername());
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint for updating the current user's profile
    @PutMapping("/profile")
    public ResponseEntity<User> updateUserProfile(@RequestBody User user) {
        UserDetails currentUserDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userService.getUserByUsername(currentUserDetails.getUsername());
        if (currentUser != null) {
            User updatedUser = userService.updateUser(currentUser.getId(), user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint for changing the user's password
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        try {
            userService.changePassword(changePasswordRequest);
            return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    

}
