package com.backend.service;

import com.backend.entity.NewsUserProfile;
import com.backend.mapper.NewsUserProfileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsUserProfileService {

    @Autowired
    private NewsUserProfileMapper newsUserProfileMapper;

    public NewsUserProfile getNewsInfoByUserId(String user_id) {
        return newsUserProfileMapper.selectById(user_id);
    }

    public void insertOrUpdateNewsInfo(NewsUserProfile newsInfo) {
        newsUserProfileMapper.insertOrUpdate(newsInfo);
    }
}
