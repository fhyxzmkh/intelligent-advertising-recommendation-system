package com.backend.controller;

import com.backend.entity.AdvertiseInfo;
import com.backend.entity.NewsUserProfile;
import com.backend.entity.ShoppingUserProfile;
import com.backend.entity.UserInfo;
import com.backend.service.AdvertiseInfoService;
import com.backend.service.NewsUserProfileService;
import com.backend.service.ShoppingUserProfileService;
import com.backend.service.UserInfoService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/advertise")
public class AdvertiseController {

    @Autowired
    private ShoppingUserProfileService shoppingUserProfileService;

    @Autowired
    private NewsUserProfileService newsUserProfileService;

    @Autowired
    private AdvertiseInfoService advertiseInfoService;

    @Autowired
    private UserInfoService userInfoService;

    @PostMapping("/add")
    public void insertAdvertise(@RequestBody AdvertiseInfo advertiseInfo) {
        advertiseInfo.setAdId(UUID.randomUUID().toString());
        advertiseInfoService.insertAdvertiseInfo(advertiseInfo);
    }

    @GetMapping("/my-advertise")
    public List<AdvertiseInfo> getMyAdvertise(@RequestParam("author") String author) {
        return advertiseInfoService.getAdvertiseInfoByAuthor(author);
    }

    @GetMapping("/all")
    public List<AdvertiseInfo> getAllAdvertise() {
        return advertiseInfoService.getAllAdvertiseInfo();
    }

    @GetMapping("/delete")
    public void deleteAdvertise(@RequestParam("adId") String adId) {
        advertiseInfoService.deleteAdvertiseInfoById(adId);
    }

    @PostMapping("/update")
    public void updateAdvertise(@RequestBody AdvertiseInfo advertiseInfo) {
        AdvertiseInfo ad = advertiseInfoService.getAdvertiseInfoById(advertiseInfo.getAdId());
        advertiseInfo.setAuthor(ad.getAuthor());

        advertiseInfoService.updateAdvertiseInfo(advertiseInfo);
    }

    @PostMapping("/get-particular-advertise")
    public List<AdvertiseInfo> getParticularAdvertise(@RequestBody Map<String, String> requestBody, HttpServletRequest request) {
        String type = requestBody.get("type");
        String apiKey = requestBody.get("apiKey");
        String user_id = requestBody.get("user_id");

        int sport_score = requestBody.get("sport_score") != null ? Integer.parseInt(requestBody.get("sport_score")) : 0;
        int digit_score = requestBody.get("digit_score") != null ? Integer.parseInt(requestBody.get("digit_score")) : 0;
        int program_score = requestBody.get("program_score") != null ? Integer.parseInt(requestBody.get("program_score")) : 0;
        int edu_score = requestBody.get("edu_score") != null ? Integer.parseInt(requestBody.get("edu_score")) : 0;

        if (apiKey == null || apiKey.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "API Key is missing");
        }

        UserInfo userInfo = userInfoService.findByApiKey(apiKey);
        if (userInfo == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid API Key");
        }

        if (user_id == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User ID is no exist");
        }

        if (Objects.equals(user_id, "undefined")) {
            return advertiseInfoService.getAllAdvertiseInfo();
        }

        updateTableInfo(type, user_id, sport_score, digit_score, program_score, edu_score);

        String advertiseCategory = calcWeight(user_id);

        if (!advertiseCategory.equals("随机"))
            return advertiseInfoService.getAdvertiseInfoByCategory(advertiseCategory);
        else
            return advertiseInfoService.getAllAdvertiseInfo();
    }

    @PostMapping("/update-db")
    public void checkDataUpdate(@RequestBody Map<String, String> requestBody, HttpServletRequest request) {
        String type = requestBody.get("type");
        String apiKey = requestBody.get("apiKey");
        String user_id = requestBody.get("user_id");

        int sport_score = requestBody.get("sport_score") != null ? Integer.parseInt(requestBody.get("sport_score")) : 0;
        int digit_score = requestBody.get("digit_score") != null ? Integer.parseInt(requestBody.get("digit_score")) : 0;
        int program_score = requestBody.get("program_score") != null ? Integer.parseInt(requestBody.get("program_score")) : 0;
        int edu_score = requestBody.get("edu_score") != null ? Integer.parseInt(requestBody.get("edu_score")) : 0;

        if (apiKey == null || apiKey.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "API Key is missing");
        }

        UserInfo userInfo = userInfoService.findByApiKey(apiKey);
        if (userInfo == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid API Key");
        }

        if (user_id == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User ID is no exist");
        }

        if (Objects.equals(user_id, "undefined")) {
            return;
        }

        updateTableInfo(type, user_id, sport_score, digit_score, program_score, edu_score);
    }

    private void updateTableInfo(String type, String user_id, int sport_score, int digit_score, int program_score, int edu_score) {

        if ("shopping".equals(type)) {
            ShoppingUserProfile shoppingInfo = new ShoppingUserProfile();

            shoppingInfo.setUserId(user_id);
            shoppingInfo.setSportScore(sport_score);
            shoppingInfo.setDigitScore(digit_score);
            shoppingInfo.setProgramScore(program_score);
            shoppingInfo.setEduScore(edu_score);

            shoppingUserProfileService.insertOrUpdateShoppingInfo(shoppingInfo);
        }

        if ("news".equals(type)) {
            NewsUserProfile newsInfo = new NewsUserProfile();

            newsInfo.setUserId(user_id);
            newsInfo.setSportScore(sport_score);
            newsInfo.setDigitScore(digit_score);
            newsInfo.setProgramScore(program_score);
            newsInfo.setEduScore(edu_score);

            newsUserProfileService.insertOrUpdateNewsInfo(newsInfo);
        }

    }

    private String calcWeight(String user_id) {
        int sport_score = 0, digit_score = 0, program_score = 0, edu_score = 0;

        ShoppingUserProfile shoppingInfo = shoppingUserProfileService.getShoppingInfoByUserId(user_id);
        if (shoppingInfo != null) {
            sport_score += shoppingInfo.getSportScore();
            digit_score += shoppingInfo.getDigitScore();
            program_score += shoppingInfo.getProgramScore();
            edu_score += shoppingInfo.getEduScore();
        }

        NewsUserProfile newsInfo = newsUserProfileService.getNewsInfoByUserId(user_id);
        if (newsInfo != null) {
            sport_score += newsInfo.getSportScore();
            digit_score += newsInfo.getDigitScore();
            program_score += newsInfo.getProgramScore();
            edu_score += newsInfo.getEduScore();
        }

        int maxScore = Math.max(sport_score, Math.max(digit_score, Math.max(program_score, edu_score)));

        if (maxScore == 0) {
            return "随机";
        }

        if (maxScore == sport_score)
            return "运动";
        else if (maxScore == digit_score)
            return "数码";
        else if (maxScore == program_score)
            return "编程";
        else if (maxScore == edu_score)
            return "考研";

        return "";
    }
}
