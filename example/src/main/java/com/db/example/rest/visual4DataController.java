package com.db.example.rest;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.db.example.service.Visual4DataService;
import com.db.example.visual4.visual4Data;

@CrossOrigin
@RestController
public class visual4DataController {

    @Autowired
    private Visual4DataService visual4DataService;

    @GetMapping("/v4data")
    public List<visual4Data> getAllVisual4Data() {
        return visual4DataService.getAllVisual4Data();
    }

}
