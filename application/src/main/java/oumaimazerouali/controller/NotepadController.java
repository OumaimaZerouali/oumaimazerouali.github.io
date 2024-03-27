package oumaimazerouali.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import oumaimazerouali.model.NoteRequest;
import oumaimazerouali.model.NoteResponse;
import oumaimazerouali.model.NotepadPageResponse;

@RestController
public class NotepadController implements  NotepadApi{
    @Override
    public ResponseEntity<NotepadPageResponse> notepadGet() {
        return null;
    }

    @Override
    public ResponseEntity<NoteResponse> notepadPost(NoteRequest noteRequest) {
        return null;
    }
}
