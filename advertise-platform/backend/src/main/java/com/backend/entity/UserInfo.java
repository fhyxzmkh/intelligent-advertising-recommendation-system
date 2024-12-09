package com.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

@TableName("user_info")
public class UserInfo {

    @TableId("uid")
    private String uid;

    @TableField("username")
    private String username;

    @TableField("password")
    private String password;

    @TableField("role")
    private CONSTANT.UserRole role;

    @TableField("is_activated")
    private boolean isActivated; // 是否激活

    @TableField("api_key")
    private String apiKey;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public CONSTANT.UserRole getRole() {
        return role;
    }

    public void setRole(CONSTANT.UserRole role) {
        this.role = role;
    }

    public boolean isActivated() {
        return isActivated;
    }

    public void setActivated(boolean activated) {
        isActivated = activated;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "uid='" + uid + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", isActivated=" + isActivated +
                ", apiKey='" + apiKey + '\'' +
                '}';
    }
}
