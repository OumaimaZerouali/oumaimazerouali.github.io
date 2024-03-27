package oumaimazerouali.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import oumaimazerouali.model.ContactPageResponse;

@RestController
public class ContactController implements ContactApi{
    @Override
    public ResponseEntity<ContactPageResponse> contactGet() {
        return null;
    }
}
