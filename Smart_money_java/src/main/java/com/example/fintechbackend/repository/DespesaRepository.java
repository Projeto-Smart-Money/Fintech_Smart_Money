package com.example.fintechbackend.repository;

import com.example.fintechbackend.model.Despesas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DespesaRepository extends JpaRepository<Despesas, Long> {
}