package com.example.fintechbackend.controller;

import com.example.fintechbackend.model.Rendas;
import com.example.fintechbackend.repository.RendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional; // Import necessário
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rendas")
@CrossOrigin(origins = "*") // 1. LIBERA O FRONT-END PARA FAZER PUT E DELETE
public class RendaController {

    @Autowired
    private RendaRepository repository;

    @GetMapping
    public List<Rendas> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Rendas criar(@RequestBody Rendas renda) {
        return repository.save(renda);
    }

    @PutMapping("/{id}")
    @Transactional
    public Rendas atualizar(@PathVariable Long id, @RequestBody Rendas rendaAtualizada) {
        return repository.findById(id)
                .map(rendaExistente -> {
                    // Atualiza apenas os campos permitidos
                    rendaExistente.setTitle(rendaAtualizada.getTitle());
                    rendaExistente.setDescription(rendaAtualizada.getDescription());
                    rendaExistente.setAmount(rendaAtualizada.getAmount());
                    rendaExistente.setCategory(rendaAtualizada.getCategory());
                    rendaExistente.setTransactionDate(rendaAtualizada.getTransactionDate());
                    return repository.save(rendaExistente);
                })
                .orElseThrow(() -> new RuntimeException("Renda não encontrada com o ID: " + id));
        // Se não achar o ID, ele estoura erro em vez de criar um novo duplicado!
    }

    @DeleteMapping("/{id}")
    @Transactional // <-- ISSO FORÇA O ORACLE A FAZER O COMMIT REAL DA EXCLUSÃO
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}