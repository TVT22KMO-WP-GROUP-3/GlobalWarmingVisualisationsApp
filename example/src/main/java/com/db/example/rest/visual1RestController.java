package com.db.example.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.example.service.visual1Service;
import com.db.example.visual1.globalmonthly;
import com.db.example.visual1.nhannual;
import com.db.example.visual1.nhmonthly;
import com.db.example.visual1.reconstruction;
import com.db.example.visual1.shannual;
import com.db.example.visual1.shmonthly;
import com.db.example.visual1.visual1;

@CrossOrigin
@RestController
public class visual1RestController {
    
    visual1Service Visual1Service;



    @Autowired
    public visual1RestController(visual1Service Visual1Service){
        this.Visual1Service = Visual1Service;
    }

    @GetMapping("/visual1")
    public List<visual1> getVisual(){
        return Visual1Service.getVisual();
    }
    @GetMapping("/nhannual")
    public List<nhannual> getNhannuals(){
        return Visual1Service.getNhannuals();
    }
    @GetMapping("/shannual")
    public List<shannual> getShannuals(){
        return Visual1Service.getShannuals();
    }
    @GetMapping("/globalmonthly")
    public List<globalmonthly> getGlobalmonths(){
        return Visual1Service.getGlobalmonths();
    }
    @GetMapping("/nhmonthly")
    public List<nhmonthly> getNhmonths(){
        return Visual1Service.getNhmonths();
    }
    @GetMapping("/shmonthly")
    public List<shmonthly> getShmonths(){
        return Visual1Service.getShmonths();
    }
    @GetMapping("/reconstruction")
    public List<reconstruction> getReconstruction(){
        return Visual1Service.getReconstruction();
    }
 
}
