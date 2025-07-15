// D:/Progetti/Git/Gestionale/security-service/src/main/java/com/PierLorrai/Gestionale/service/UserService.java
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder; // Aggiunto per gestire la password in createUser/updateUser

    public List<User> getAllUsers() {
        log.debug("Fetching all users.");
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        log.debug("Fetching user with ID: {}", id);
        return userRepository.findById(id);
    }

    @Transactional
    public User createUser(User user) { // NUOVO METODO O AGGIUSTAMENTO
        log.info("Creating new user: {}", user.getUsername());
        // Assicurati di codificare la password prima di salvare un nuovo utente
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Inizializza i ruoli se non sono già stati impostati (es. per un utente registrato con un solo ruolo)
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            roleRepository.findByName("USER").ifPresent(role -> user.getRoles().add(role));
        }
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Long userId, User updatedUser) { // NUOVO METODO O AGGIUSTAMENTO
        log.info("Updating user with ID: {}", userId);
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found."));

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());

        // Aggiorna la password solo se fornita e diversa
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty() && !passwordEncoder.matches(updatedUser.getPassword(), existingUser.getPassword())) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        // Se updateUser include anche ruoli, questa logica è un po' più complessa
        // Per ora, assumiamo che assignRolesToUser sia chiamato separatamente per i ruoli
        // Se i ruoli vengono passati anche qui, dovresti unire o sovrascrivere.
        // Ad esempio: existingUser.setRoles(updatedUser.getRoles()); // Attenzione: questo sovrascrive completamente
        // Meglio gestire l'assegnazione dei ruoli tramite il metodo dedicato `assignRolesToUser`

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
    public User assignRolesToUser(Long userId, Set<String> roleNames) { // NUOVO METODO O AGGIUSTAMENTO
        log.info("Assigning roles {} to user with ID: {}", roleNames, userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found."));

        Set<Role> rolesToAssign = roleNames.stream()
                .map(roleName -> roleRepository.findByName(roleName)
                        .orElseThrow(() -> new RoleNotFoundException("Role " + roleName + " not found.")))
                .collect(Collectors.toSet());

        user.setRoles(rolesToAssign); // Imposta direttamente il set di ruoli
        return userRepository.save(user);
    }

    // Mantengo i metodi add/remove se vuoi anche un controllo più granulare
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