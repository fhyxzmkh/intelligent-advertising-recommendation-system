package com.backend.service;

import com.backend.entity.ShoppingInfo;
import com.backend.mapper.ShoppingInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingInfoService {

    @Autowired
    private ShoppingInfoMapper shoppingInfoMapper;

    public ShoppingInfo getShoppingInfoByUserId(String user_id) {
        return shoppingInfoMapper.selectById(user_id);
    }

    public void insertOrUpdateShoppingInfo(ShoppingInfo shoppingInfo) {
        shoppingInfoMapper.insertOrUpdate(shoppingInfo);
    }
}
