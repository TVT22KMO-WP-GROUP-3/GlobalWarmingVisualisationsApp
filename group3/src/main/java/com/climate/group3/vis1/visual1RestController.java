package com.climate.group3.vis1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
