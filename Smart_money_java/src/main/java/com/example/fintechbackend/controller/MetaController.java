package com.example.fintechbackend.controller;

import com.example.fintechbackend.model.Meta;
import com.example.fintechbackend.repository.MetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "*") // <-- ADICIONE ESSA LINHA EXATAMENTE AQUI!
public class MetaController {

    @Autowired
    private MetaRepository repository;

    @GetMapping
    public List<Meta> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Meta criar(@RequestBody Meta meta) {
        return repository.save(meta);
    }

    @PutMapping("/{id}")
    public Meta atualizar(@PathVariable Long id, @RequestBody Meta metaAtualizada) {
        return repository.findById(id)
                .map(meta -> {
                    meta.setTitle(metaAtualizada.getTitle());
                    meta.setDescription(metaAtualizada.getDescription());
                    meta.setAmount(metaAtualizada.getAmount());
                    meta.setCategory(metaAtualizada.getCategory());
                    meta.setTransactionDate(metaAtualizada.getTransactionDate());
                    return repository.save(meta);
                }).orElseThrow(() -> new RuntimeException("Meta não encontrada"));
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
