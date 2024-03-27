package oumaimazerouali.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import oumaimazerouali.model.HomepageResponse;

@RestController
public class HomeController implements HomeApi{
    @Override
    public ResponseEntity<HomepageResponse> rootGet() {
        HomepageResponse response = new HomepageResponse();
        response.setContent("Welcome to the homepage!");
        return ResponseEntity.ok(response);
    }
}
