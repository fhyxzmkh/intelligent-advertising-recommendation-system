package com.backend.service;

import com.backend.entity.NewsInfo;
import com.backend.mapper.NewsInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsInfoService {

    @Autowired
    private NewsInfoMapper newsInfoMapper;

    public NewsInfo getNewsInfoByUserId(String user_id) {
        return newsInfoMapper.selectById(user_id);
    }

    public void insertOrUpdateNewsInfo(NewsInfo newsInfo) {
        newsInfoMapper.insertOrUpdate(newsInfo);
    }
}
