package oumaimazerouali.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/home")
    public String getHomePage() {
        return "Welcome to my website!";
    }

    @GetMapping("/about")
    public String getAboutPage() {
        return "About Me: I am [your name], a passionate developer.";
    }
}
