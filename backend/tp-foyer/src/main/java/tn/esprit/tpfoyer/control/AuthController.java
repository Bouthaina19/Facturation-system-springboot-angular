package tn.esprit.tpfoyer.control;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.tpfoyer.security.JwtUtil;
import tn.esprit.tpfoyer.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("Password reçu: " + request.getPassword());
        if (authService.validatePassword(request.getPassword())) {
            String token = jwtUtil.generateToken("manager");
            return ResponseEntity.ok(new LoginResponse(token));
        }
        return ResponseEntity.status(401).body("Mot de passe incorrect");

    }


    // DTOs internes
    static class LoginRequest {
        private String password;
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    static class LoginResponse {
        private String token;
        public LoginResponse(String token) { this.token = token; }
        public String getToken() { return token; }
    }
}
