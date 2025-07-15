package com.PierLorrai.Gestionale.management_service.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice                     // vale per TUTTI i controller
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrity(DataIntegrityViolationException ex) {

        // Puoi anche loggare l’errore in dettaglio qui se ti serve
        String msg = "Violazione vincolo di unicità: l’email è già registrata.";

        return ResponseEntity.status(HttpStatus.CONFLICT).body(msg);  // 409
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<String> duplicateEmail() {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Email già presente, scegliere un’altra.");
    }


}

