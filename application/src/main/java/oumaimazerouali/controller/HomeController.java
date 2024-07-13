package oumaimazerouali.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/home")
    public String getHomePage() {
        return "Welcome to my website!";
    }

    @GetMapping("/contact")
    public String getContactPage() {
        return "Contact page";
    }
}
