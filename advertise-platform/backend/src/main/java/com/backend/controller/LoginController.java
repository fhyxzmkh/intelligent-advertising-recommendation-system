package com.backend.controller;

import com.backend.entity.UserInfo;
import com.backend.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserInfoService userInfoService;

    @PostMapping
    public ResponseEntity<UserInfo> loginUser(@RequestBody UserInfo userInfo) {
        boolean isValidUser = userInfoService.validateUser(userInfo.getUsername(), userInfo.getPassword());

        if (isValidUser) {
            return ResponseEntity.ok(userInfoService.findByUsername(userInfo.getUsername()));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
