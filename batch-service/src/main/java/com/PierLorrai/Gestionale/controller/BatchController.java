package com.PierLorrai.Gestionale.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/batch")
@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
@RequiredArgsConstructor
public class BatchController {

    private final JobLauncher jobLauncher;
    private final Job processPendingOrdersJob; // Inietta il Job che abbiamo definito

    @PostMapping("/start")
    public ResponseEntity<String> startProcessOrdersJob() {
        // Aggiungi un parametro univoco per ogni esecuzione del job per permettere job multipli
        // Un JobParameter può essere qualsiasi cosa che rende l'esecuzione unica. Qui usiamo un timestamp.
        JobParameters jobParameters = new JobParametersBuilder()
                .addLong("time", System.currentTimeMillis())
                .toJobParameters();

        try {
            JobExecution jobExecution = jobLauncher.run(processPendingOrdersJob, jobParameters);
            return ResponseEntity.ok("Job 'processPendingOrdersJob' started with ID: " + jobExecution.getId() + " and status: " + jobExecution.getStatus());
        } catch (JobExecutionAlreadyRunningException | JobRestartException | JobInstanceAlreadyCompleteException | JobParametersInvalidException e) {
            return ResponseEntity.status(500).body("Error starting job: " + e.getMessage());
        }
    }

    // Potresti aggiungere altri endpoint per avviare altri job o controllare lo stato di un job
    // Es. @GetMapping("/job-status/{jobId}")
}
