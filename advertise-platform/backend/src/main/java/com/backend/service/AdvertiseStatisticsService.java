package com.backend.service;

import com.backend.entity.AdvertiseStatistics;
import com.backend.mapper.AdvertiseStatisticsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdvertiseStatisticsService {

    @Autowired
    private AdvertiseStatisticsMapper advertiseStatisticsMapper;

    public List<AdvertiseStatistics> getAllStatistics() {
        return advertiseStatisticsMapper.selectList(null);
    }

    public void InsertAdvertiseStatistics(AdvertiseStatistics newData) {
        advertiseStatisticsMapper.insert(newData);
    }

    public List<AdvertiseStatistics> getStatisticsByAuthor(String author) {
        return advertiseStatisticsMapper.selectByAuthor(author);
    }

    public Integer getClickedCount(String adId) {
        return advertiseStatisticsMapper.selectClickedCount(adId);
    }
}
