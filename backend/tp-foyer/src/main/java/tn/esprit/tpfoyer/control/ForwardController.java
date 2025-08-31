package tn.esprit.tpfoyer.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ForwardController {

    // 🔥 Capture toutes les routes Angular
    @GetMapping(value = {
            "/app/**",
            "/login"
    })
    public String forward() {
        // renvoie index.html (Angular s’occupe du routing)
        return "forward:/index.html";
    }
}
