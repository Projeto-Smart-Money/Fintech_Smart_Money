package com.example.despesas.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "TB_DESPESA")
public class Despesas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // <-- MUDADO PARA IDENTITY
    private Long id;
    private String title;
    private String description;
    private Double amount;
    private String category;

    @Column(name = "expense_date")
    @JsonFormat(pattern = "yyyy-MM-dd") // Garante que o Jackson converta o JSON perfeitamente
    private LocalDate transactionDate; // A única variável que aponta para expense_date agora!

    public Despesas() {}

    // Getters e Setters corrigidos
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