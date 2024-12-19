package com.backend.service;

import com.backend.entity.UserInfo;
import com.backend.mapper.UserInfoMapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoMapper userInfoMapper;

    public void insertUser(UserInfo userInfo) {
        userInfoMapper.insert(userInfo);
    }

    public List<UserInfo> getAllUserInfo() {
        return userInfoMapper.selectList(null);
    }

    public UserInfo getUserInfoById(String uid) {
        return userInfoMapper.selectById(uid);
    }

    public UserInfo findByUsername(String username) {
        return userInfoMapper.findByUsername(username);
    }

    public UserInfo findByApiKey(String apiKey) {
        LambdaQueryWrapper<UserInfo> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(UserInfo::getApiKey, apiKey);

        return userInfoMapper.selectOne(wrapper);
    }

    public boolean validateUser(String username, String password) {
        UserInfo user = findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    public void updateUserInfo(UserInfo userInfo) {
        userInfoMapper.updateById(userInfo);
    }

    public void deleteUserInfo(String uid) {
        userInfoMapper.deleteById(uid);
    }

}
