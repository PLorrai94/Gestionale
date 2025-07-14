package com.PierLorrai.Gestionale.service;

import com.PierLorrai.Gestionale.model.Role;
import com.PierLorrai.Gestionale.model.User;
import com.PierLorrai.Gestionale.repository.RoleRepository;
import com.PierLorrai.Gestionale.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        // Cripta la password prima di salvare
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Assicurati che i ruoli esistano o crea nuovi ruoli se non presenti (per ruoli non standard)
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            List<Role> managedRoles = user.getRoles().stream()
                    .map(role -> roleRepository.findByName(role.getName())
                            .orElseThrow(() -> new IllegalArgumentException("Role " + role.getName() + " not found.")))
                    .collect(Collectors.toList());
            user.setRoles(managedRoles);
        } else {
            // Assegna ruolo USER di default se non specificato
            Role defaultRole = roleRepository.findByName("USER")
                    .orElseThrow(() -> new IllegalStateException("Default USER role not found. Please create it."));
            user.setRoles(List.of(defaultRole));
        }
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        // Gestione aggiornamento ruoli
        if (userDetails.getRoles() != null) {
            List<Role> updatedRoles = userDetails.getRoles().stream()
                    .map(role -> roleRepository.findByName(role.getName())
                            .orElseThrow(() -> new IllegalArgumentException("Role " + role.getName() + " not found.")))
                    .collect(Collectors.toList());
            user.setRoles(updatedRoles);
        }

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public User assignRolesToUser(Long userId, Set<String> roleNames) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        List<Role> rolesToAssign = roleNames.stream()
                .map(roleName -> roleRepository.findByName(roleName)
                        .orElseThrow(() -> new IllegalArgumentException("Role " + roleName + " not found.")))
                .collect(Collectors.toList());

        user.setRoles(rolesToAssign);
        return userRepository.save(user);
    }
}
