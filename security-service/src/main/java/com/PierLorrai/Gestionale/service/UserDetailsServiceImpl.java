// D:/Progetti/Git/Gestionale/security-service/src/main/java/com/PierLorrai/Gestionale/service/UserDetailsServiceImpl.java
package com.PierLorrai.Gestionale.service; // AGGIORNATO

import com.PierLorrai.Gestionale.model.User;
import com.PierLorrai.Gestionale.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Loading user by username: {}", username);
        // Poiché la tua classe User ora implementa UserDetails, puoi restituirla direttamente
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.warn("User not found: {}", username);
                    return new UsernameNotFoundException("User not found with username: " + username);
                });
        return user; // Restituisce direttamente la tua entità User che è anche un UserDetails
    }
}