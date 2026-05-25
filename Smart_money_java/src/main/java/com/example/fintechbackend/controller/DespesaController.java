package com.example.despesas.controller;

import com.example.despesas.model.Despesas;
import com.example.despesas.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional; // Import essencial
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/despesas")
@CrossOrigin(origins = "*") // 1. LIBERA O FRONT-END (CORS)
public class DespesaController {
    @Autowired
    private DespesaRepository repository;

    @GetMapping
    public List<Despesas> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Despesas criar(@RequestBody Despesas despesa) {
        return repository.save(despesa);
    }

    @PutMapping("/{id}")
    @Transactional // 2. GARANTE O COMMIT NO ORACLE
    public Despesas atualizar(@PathVariable Long id, @RequestBody Despesas despesaAtualizada) {
        return repository.findById(id)
                .map(despesaExistente -> {
                    despesaExistente.setTitle(despesaAtualizada.getTitle());
                    despesaExistente.setDescription(despesaAtualizada.getDescription());
                    despesaExistente.setAmount(despesaAtualizada.getAmount());
                    despesaExistente.setCategory(despesaAtualizada.getCategory());
                    despesaExistente.setTransactionDate(despesaAtualizada.getTransactionDate()); // Nome novo
                    return repository.save(despesaExistente);
                })
                .orElseThrow(() -> new RuntimeException("Despesa não encontrada com o ID: " + id)); // Evita duplicar
    }

    @DeleteMapping("/{id}")
    @Transactional // 3. FORÇA A EXCLUSÃO REAL NO BANCO
    public void deletar(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        }
    }
}