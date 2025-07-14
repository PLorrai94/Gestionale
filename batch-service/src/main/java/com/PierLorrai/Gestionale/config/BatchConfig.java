package com.PierLorrai.Gestionale.config;


import com.PierLorrai.Gestionale.common.Order;
import com.PierLorrai.Gestionale.common.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.RepositoryItemReader;
import org.springframework.batch.item.data.RepositoryItemWriter;
import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
import org.springframework.batch.item.data.builder.RepositoryItemWriterBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.PlatformTransactionManager;


import java.util.HashMap;

@Configuration
@RequiredArgsConstructor
public class BatchConfig {

    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final OrderRepository orderRepository; // Inietta il repository dell'ordine

    // ItemReader: Legge gli ordini con stato "PENDING"
    @Bean
    public ItemReader<Order> orderReader() {
        // Questa implementazione legge direttamente dal database usando il OrderRepository
        // Considera di creare una vista o un DTO se l'entità Order è troppo grande o non adatta per il batch
        RepositoryItemReader<Order> reader = new RepositoryItemReaderBuilder<Order>()
                .name("orderItemReader")
                .repository(orderRepository)
                .methodName("findByStatus") // Questo metodo dovrà essere creato in OrderRepository
                .arguments("PENDING") // Leggi solo ordini con status "PENDING"
                .pageSize(10) // Leggi 10 elementi alla volta
                .sorts(new HashMap<String, Sort.Direction>() {{
                    put("orderDate", Sort.Direction.ASC); // Ordina per data
                }})
                .build();
        return reader;
    }

    // ItemProcessor: Processa l'ordine (es. cambia lo stato)
    @Bean
    public ItemProcessor<Order, Order> orderProcessor() {
        return order -> {
            // Logica di elaborazione: cambia lo stato dell'ordine
            System.out.println("Processing Order ID: " + order.getId() + " - Old Status: " + order.getStatus());
            order.setStatus("PROCESSED");
            System.out.println("Processing Order ID: " + order.getId() + " - New Status: " + order.getStatus());
            // Potresti aggiungere logica di business più complessa qui
            return order;
        };
    }

    // ItemWriter: Scrive l'ordine aggiornato nel database
    @Bean
    public ItemWriter<Order> orderWriter() {
        RepositoryItemWriter<Order> writer = new RepositoryItemWriterBuilder<Order>()
                .repository(orderRepository)
                .methodName("save") // Usa il metodo save del repository per aggiornare gli ordini
                .build();
        return writer;
    }

    // Step: Combina Reader, Processor, Writer
    @Bean
    public Step processOrdersStep(
            ItemReader<Order> orderReader,
            ItemProcessor<Order, Order> orderProcessor,
            ItemWriter<Order> orderWriter
    ) {
        return new StepBuilder("processOrdersStep", jobRepository)
                .<Order, Order>chunk(10, transactionManager) // Elabora in blocchi di 10 elementi
                .reader(orderReader)
                .processor(orderProcessor)
                .writer(orderWriter)
                .build();
    }

    // Job: Orchestra gli Step
    @Bean
    public Job processPendingOrdersJob(Step processOrdersStep) {
        return new JobBuilder("processPendingOrdersJob", jobRepository)
                .start(processOrdersStep)
                .build();
    }
}
