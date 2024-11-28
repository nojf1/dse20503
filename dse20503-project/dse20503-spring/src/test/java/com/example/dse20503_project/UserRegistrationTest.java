package com.example.dse20503_project;

import com.example.dse20503_project.entity.User;
import com.example.dse20503_project.repository.UserRepository;
import com.example.dse20503_project.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


public class UserRegistrationTest {

	@Mock
	private UserRepository userRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@InjectMocks
	private UserService userService;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void testUserRegistration() {
		User user = new User();
		user.setUsername("testuser");
		user.setEmail("test@example.com");
		user.setPassword("password123");

		when(userRepository.findByUsername(user.getUsername())).thenReturn(null);
		when(userRepository.findByEmail(user.getEmail())).thenReturn(null);
		when(passwordEncoder.encode(user.getPassword())).thenReturn("encryptedPassword");
		when(userRepository.save(any(User.class))).thenReturn(user);

		User registeredUser = userService.registerUser(user);

		assertNotNull(registeredUser);
		assertEquals("testuser", registeredUser.getUsername());
		assertEquals("test@example.com", registeredUser.getEmail());
		assertEquals("encryptedPassword", registeredUser.getPassword());
		assertEquals("ROLE_USER", registeredUser.getRole().name());
	}

	@Test
	public void testEmailDuplication() {
		User user = new User();
		user.setUsername("testuser");
		user.setEmail("test@example.com");
		user.setPassword("password123");

		when(userRepository.findByEmail(user.getEmail())).thenReturn(user);

		Exception exception = assertThrows(IllegalArgumentException.class, () -> {
			userService.registerUser(user);
		});

		assertEquals("Email already exists", exception.getMessage());
	}

	@Test
	public void testPasswordEncryption() {
		User user = new User();
		user.setUsername("testuser");
		user.setEmail("test@example.com");
		user.setPassword("password123");

		when(userRepository.findByUsername(user.getUsername())).thenReturn(null);
		when(userRepository.findByEmail(user.getEmail())).thenReturn(null);
		when(passwordEncoder.encode(user.getPassword())).thenReturn("encryptedPassword");
		when(userRepository.save(any(User.class))).thenReturn(user);

		User registeredUser = userService.registerUser(user);

		assertNotNull(registeredUser);
		assertEquals("encryptedPassword", registeredUser.getPassword());
	}

	@Test
	public void testPermissionAssignment() {
		User user = new User();
		user.setUsername("testuser");
		user.setEmail("test@example.com");
		user.setPassword("password123");

		when(userRepository.findByUsername(user.getUsername())).thenReturn(null);
		when(userRepository.findByEmail(user.getEmail())).thenReturn(null);
		when(passwordEncoder.encode(user.getPassword())).thenReturn("encryptedPassword");
		when(userRepository.save(any(User.class))).thenReturn(user);

		User registeredUser = userService.registerUser(user);

		assertNotNull(registeredUser);
		assertEquals("ROLE_USER", registeredUser.getRole().name());
	}
}