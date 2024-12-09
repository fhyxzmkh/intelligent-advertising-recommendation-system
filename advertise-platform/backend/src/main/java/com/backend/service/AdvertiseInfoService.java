package com.backend.service;

import com.backend.entity.AdvertiseInfo;
import com.backend.mapper.AdvertiseInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdvertiseInfoService {

    @Autowired
    private AdvertiseInfoMapper advertiseInfoMapper;

    public void insertAdvertiseInfo(AdvertiseInfo advertiseInfo) {
        advertiseInfoMapper.insert(advertiseInfo);
    }

    public List<AdvertiseInfo> getAllAdvertiseInfo() {
        return advertiseInfoMapper.selectAll();
    }

    public List<AdvertiseInfo> getAdvertiseInfoByAuthor(String author) {
        return advertiseInfoMapper.selectByAuthor(author);
    }

    public AdvertiseInfo getAdvertiseInfoById(String adId) {
        return advertiseInfoMapper.selectById(adId);
    }

    public List<AdvertiseInfo> getAdvertiseInfoByCategory(String category) {
        return advertiseInfoMapper.selectByCategory(category);
    }

    public void deleteAdvertiseInfoById(String adId) {
        advertiseInfoMapper.deleteById(adId);
    }

    public void updateAdvertiseInfo(AdvertiseInfo advertiseInfo) {
        advertiseInfoMapper.updateById(advertiseInfo);
    }

}
