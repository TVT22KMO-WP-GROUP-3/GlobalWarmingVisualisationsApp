package com.db.example.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.example.service.visual3service;
import com.db.example.visual3.Gast;
import com.db.example.visual3.Humanactivities;
import com.db.example.visual3.Carbon;

@CrossOrigin
@RestController
public class visual3restController {

    visual3service Visual3Service;

    @Autowired
    public visual3restController(visual3service Visual3Service) {
        this.Visual3Service = Visual3Service;
    }


    // TÄNNE REST CONTROLLERIT POLUT JNE
    @GetMapping("/carbon")
    public List<Carbon> getCarbons(){
        System.out.println("@Get carbon");
        return Visual3Service.getCarbons();
    }

    @GetMapping("/gast")
    public List<Gast> getGasts(){
        System.out.println("@Get gast");
        return Visual3Service.getGasts();
    }

    @GetMapping("/humanactivities")
    public List<Humanactivities> getHumanactions(){
        System.out.println("@Get humanactions");
        return Visual3Service.getHumanactivities();
    }

}
