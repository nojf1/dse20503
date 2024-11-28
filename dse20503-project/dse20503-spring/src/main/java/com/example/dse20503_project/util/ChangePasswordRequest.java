package com.example.dse20503_project.util;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
    private Long userId;
    private String oldPassword;
    private String newPassword;
}