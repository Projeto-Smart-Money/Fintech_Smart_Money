package com.example.fintechbackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "TB_RENDA")
public class Rendas {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "renda_seq")
// Mudamos o sequenceName de "RENDA_SEQ" para "SQ_RENDA"
    @SequenceGenerator(name = "renda_seq", sequenceName = "SQ_RENDA", allocationSize = 1)
    private Long id;

    private String title;
    private String description;
    private Double amount;
    private String category;

    @Column(name = "transaction_date")
    private LocalDate transactionDate;

    public Rendas() {}

    // getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDate getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDate transactionDate) { this.transactionDate = transactionDate; }
}
