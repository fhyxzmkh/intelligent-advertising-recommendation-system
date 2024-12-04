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

}
