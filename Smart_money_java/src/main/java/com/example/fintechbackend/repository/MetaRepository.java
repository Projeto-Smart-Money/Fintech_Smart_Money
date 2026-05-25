package com.example.metas.repository;

import com.example.metas.model.Meta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetaRepository extends JpaRepository<Meta, Long> {
}