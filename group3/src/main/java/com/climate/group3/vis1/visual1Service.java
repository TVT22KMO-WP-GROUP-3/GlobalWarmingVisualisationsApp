package com.climate.group3.vis1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class visual1Service {
    
    @Autowired
    visual1Repository vis1Repo;

    public List<visual1> getVisual(){
    return vis1Repo.findAll();
    }
}
