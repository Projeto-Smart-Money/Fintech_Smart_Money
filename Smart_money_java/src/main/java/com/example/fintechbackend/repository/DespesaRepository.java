package com.example.despesas.repository;

import com.example.despesas.model.Despesas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DespesaRepository extends JpaRepository<Despesas, Long> {
}