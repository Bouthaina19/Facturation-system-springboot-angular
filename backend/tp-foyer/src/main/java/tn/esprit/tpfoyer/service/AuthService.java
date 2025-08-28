package tn.esprit.tpfoyer.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final String MANAGER_PASSWORD = "$2a$10$iya6qJy20vt7uuVJieXBMe4PF40mY/.g36pxTqfxJNrJg.0W6z2NC";
    // hashé "manager123" avec BCrypt

    public boolean validatePassword(String rawPassword) {
        boolean result = new BCryptPasswordEncoder().matches(rawPassword, MANAGER_PASSWORD);
        System.out.println("Comparaison: " + rawPassword + " => " + result);
        return new BCryptPasswordEncoder().matches(rawPassword, MANAGER_PASSWORD);
    }
}
