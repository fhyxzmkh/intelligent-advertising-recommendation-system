package com.backend.service;

import com.backend.entity.ShoppingUserProfile;
import com.backend.mapper.ShoppingUserProfileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShoppingUserProfileService {

    @Autowired
    private ShoppingUserProfileMapper shoppingUserProfileMapper;

    public ShoppingUserProfile getShoppingInfoByUserId(String user_id) {
        return shoppingUserProfileMapper.selectById(user_id);
    }

    public void insertOrUpdateShoppingInfo(ShoppingUserProfile shoppingInfo) {
        shoppingUserProfileMapper.insertOrUpdate(shoppingInfo);
    }
}
