package com.PierLorrai.Gestionale.service;

import com.PierLorrai.Gestionale.exception.RoleNotFoundException;
import com.PierLorrai.Gestionale.exception.UserNotFoundException;
import com.PierLorrai.Gestionale.model.Role;
import com.PierLorrai.Gestionale.model.User;
import com.PierLorrai.Gestionale.repository.RoleRepository;
import com.PierLorrai.Gestionale.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public Page<User> getAllUsers(Pageable pageable) {
        log.debug("Fetching all users.");
        return userRepository.findAll(pageable);
    }

    public Optional<User> getUserById(Long id) {
        log.debug("Fetching user with ID: {}", id);
        return userRepository.findById(id);
    }

    @Transactional
    public User createUser(User user) {
        log.info("Creating new user: {}", user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            roleRepository.findByName("USER").ifPresent(role -> user.getRoles().add(role));
        }
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Long userId, User updatedUser) {
        log.info("Updating user with ID: {}", userId);
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found."));

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()
                && !passwordEncoder.matches(updatedUser.getPassword(), existingUser.getPassword())) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        log.info("Deleting user with ID: {}", id);
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User with ID " + id + " not found.");
        }
        userRepository.deleteById(id);
    }

    @Transactional
    public User assignRolesToUser(Long userId, Set<String> roleNames) {
        log.info("Assigning roles {} to user with ID: {}", roleNames, userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found."));

        Set<Role> rolesToAssign = roleNames.stream()
                .map(roleName -> roleRepository.findByName(roleName)
                        .orElseThrow(() -> new RoleNotFoundException("Role " + roleName + " not found.")))
                .collect(Collectors.toSet());

        user.setRoles(rolesToAssign);
        return userRepository.save(user);
    }

    @Transactional
    public User addRoleToUser(Long userId, String roleName) {
        log.info("Adding role {} to user with ID: {}", roleName, userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found."));

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RoleNotFoundException("Role " + roleName + " not found."));

        user.getRoles().add(role);
        return userRepository.save(user);
    }

    @Transactional
    public User removeRoleFromUser(Long userId, String roleName) {
        log.info("Removing role {} from user with ID: {}", roleName, userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found."));

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RoleNotFoundException("Role " + roleName + " not found."));

        user.getRoles().remove(role);
        return userRepository.save(user);
    }
}
