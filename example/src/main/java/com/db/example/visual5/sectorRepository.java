package com.db.example.visual5;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface sectorRepository extends JpaRepository<sectori, Long> {
    
}
