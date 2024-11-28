package com.example.dse20503_project.util;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    private String username;
    private String password;
    
    public LoginRequest() {
        
    }
    
    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
    
}
