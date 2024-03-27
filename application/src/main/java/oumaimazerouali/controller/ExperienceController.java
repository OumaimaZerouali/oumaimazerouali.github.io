package oumaimazerouali.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import oumaimazerouali.model.ExperiencePageResponse;

@RestController
public class ExperienceController implements ExperienceApi{
    @Override
    public ResponseEntity<ExperiencePageResponse> experienceGet() {
        return null;
    }
}
