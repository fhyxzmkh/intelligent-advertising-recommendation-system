package com.backend.controller;

import com.backend.entity.UserInfo;
import com.backend.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/apikey")
public class ApiController {

    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/add-api")
    public String addApiKey(@RequestParam("uid") String uid) {

        UserInfo userInfo = userInfoService.getUserInfoById(uid);

        if (userInfo.getApiKey() != null)
            return "Already has an API key";

        String apiKey = UUID.randomUUID().toString();
        userInfo.setApiKey(apiKey);

        userInfoService.updateUserInfo(userInfo);

        return null;
    }

    @GetMapping("/get-api")
    public String getApiKey(@RequestParam("uid") String uid) {

        UserInfo userInfo = userInfoService.getUserInfoById(uid);
        if (userInfo.getApiKey() == null) return "";
        else return userInfo.getApiKey();

    }

    @GetMapping("/delete-api")
    public void deleteApiKey(@RequestParam("uid") String uid) {
        UserInfo userInfo = userInfoService.getUserInfoById(uid);
        if (userInfo.getApiKey() != null) return ;

        userInfo.setApiKey(null);

        userInfoService.updateUserInfo(userInfo);
    }

}
