package com.backend.controller;

import com.backend.entity.UserInfo;
import com.backend.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    private UserInfoService userInfoService;

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody UserInfo userInfo) {

        userInfo.setUid(UUID.randomUUID().toString());
        userInfo.setActivated(true);

        if (userInfoService.findByUsername(userInfo.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        userInfoService.insertUser(userInfo);

        return ResponseEntity.ok("User registered successfully");
    }

}
