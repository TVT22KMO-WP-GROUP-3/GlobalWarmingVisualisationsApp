package com.db.example.SavedViews;
import com.db.example.security.securityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin
@RestController
public class savedViewRest {
    @Autowired
    savedViewService savedViewService;
    @Autowired
    securityService secService;


    @PostMapping("/api/savedviews")
    public ResponseEntity<String> saveViewPost(@RequestHeader("Authorization") String token, @RequestParam String viewID, @RequestParam String viewstring) {
        if(token != null)
        {
            if(token.startsWith("Bearer "))
                token = token.split(" ")[1];
        }
        String username = secService.validateToken(token);
        if (username != null) {
        savedViewService.saveView(new savedview(viewID, viewstring, username));
        return new ResponseEntity<>("View saved", HttpStatus.OK);
    }
    return new ResponseEntity<>("Wrong/Missing token", HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/api/savedviews/{viewID}")
    public ResponseEntity<String> getView(@PathVariable String viewID) {
        savedview view = savedViewService.getView(viewID);
        if (view == null) {
            return new ResponseEntity<>("View not found", HttpStatus.NOT_FOUND);
        }
        String returnString = view.getUsername() + "&&" + view.getViewString();
        return new ResponseEntity<>(returnString, HttpStatus.OK);
    }

}
