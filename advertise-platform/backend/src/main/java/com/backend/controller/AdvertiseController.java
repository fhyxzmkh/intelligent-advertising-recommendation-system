package com.backend.controller;

import com.backend.entity.AdvertiseInfo;
import com.backend.entity.NewsUserProfile;
import com.backend.entity.ShoppingUserProfile;
import com.backend.service.AdvertiseInfoService;
import com.backend.service.NewsUserProfileService;
import com.backend.service.ShoppingUserProfileService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping
    public List<AdvertiseInfo> getParticularAdvertise(@RequestBody Map<String, String> requestBody, HttpServletRequest request) {
        String type = requestBody.get("type");

        String user_id = null;
        int sport_score = 0, digit_score = 0, program_score = 0, edu_score = 0;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (Objects.equals(cookie.getName(), "user_id")) {
                    user_id = cookie.getValue();
                } else if (Objects.equals(cookie.getName(), "sport_score")) {
                    sport_score = Integer.parseInt(cookie.getValue());
                } else if (Objects.equals(cookie.getName(), "digit_score")) {
                    digit_score = Integer.parseInt(cookie.getValue());
                } else if (Objects.equals(cookie.getName(), "program_score")) {
                    program_score = Integer.parseInt(cookie.getValue());
                } else if (Objects.equals(cookie.getName(), "edu_score")) {
                    edu_score = Integer.parseInt(cookie.getValue());
                }
            }
        }

        if (needUpdateInfo(type, user_id, sport_score, digit_score, program_score, edu_score)) {
            updateInfo(type, user_id, sport_score, digit_score, program_score, edu_score);
        }

        // ========================================
        String advertiseCategory = calcWeight(user_id);
        // System.out.println(advertiseCategory);

        if (!advertiseCategory.equals("随机"))
            return advertiseInfoService.getAdvertiseInfoByCategory(advertiseCategory);
        else
            return advertiseInfoService.getAllAdvertiseInfo();
    }

    private boolean needUpdateInfo(String type, String user_id, int sport_score, int digit_score, int program_score, int edu_score) {

        if ("shopping".equals(type)) {
            ShoppingUserProfile shoppingInfo = shoppingUserProfileService.getShoppingInfoByUserId(user_id);

            if (shoppingInfo == null) {
                return true;
            }

            return shoppingInfo.getSportScore() != sport_score ||
                    shoppingInfo.getDigitScore() != digit_score ||
                    shoppingInfo.getProgramScore() != program_score ||
                    shoppingInfo.getEduScore() != edu_score;
        }
        if ("news".equals(type)) {
            NewsUserProfile newsInfo = newsUserProfileService.getNewsInfoByUserId(user_id);

            if (newsInfo == null) {
                return true;
            }

            return newsInfo.getSportScore() != sport_score ||
                    newsInfo.getDigitScore() != digit_score ||
                    newsInfo.getProgramScore() != program_score ||
                    newsInfo.getEduScore() != edu_score;
        }

        return false;
    }

    private void updateInfo(String type, String user_id, int sport_score, int digit_score, int program_score, int edu_score) {

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
