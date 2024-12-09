package com.backend.controller;

import com.backend.entity.UserInfo;
import com.backend.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/all")
    public List<UserInfo> getAllUserInfo() {
        return userInfoService.getAllUserInfo();
    }

    @PostMapping("/update")
    public void updateUserInfo(@RequestBody UserInfo userInfo) {

        UserInfo user = userInfoService.getUserInfoById(userInfo.getUid());
        userInfo.setUsername(user.getUsername());
        userInfo.setPassword(user.getPassword());
        userInfo.setRole(user.getRole());

        userInfoService.updateUserInfo(userInfo);
    }

    @GetMapping("/delete")
    public void DeleteUserInfo(@RequestParam("uid") String uid) {
        userInfoService.deleteUserInfo(uid);
    }

}
