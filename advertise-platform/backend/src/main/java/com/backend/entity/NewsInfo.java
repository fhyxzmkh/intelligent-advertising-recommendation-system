package com.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

@TableName("news_info")
public class NewsInfo {

    @TableId("user_id")
    private String userId;

    @TableField("sport_score")
    private int sportScore;

    @TableField("program_score")
    private int programScore;

    @TableField("digit_score")
    private int digitScore;

    @TableField("edu_score")
    private int eduScore;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getSportScore() {
        return sportScore;
    }

    public void setSportScore(int sportScore) {
        this.sportScore = sportScore;
    }

    public int getProgramScore() {
        return programScore;
    }

    public void setProgramScore(int programScore) {
        this.programScore = programScore;
    }

    public int getDigitScore() {
        return digitScore;
    }

    public void setDigitScore(int digitScore) {
        this.digitScore = digitScore;
    }

    public int getEduScore() {
        return eduScore;
    }

    public void setEduScore(int eduScore) {
        this.eduScore = eduScore;
    }

    @Override
    public String toString() {
        return "ShoppingInfo{" +
                "userId='" + userId + '\'' +
                ", sportScore=" + sportScore +
                ", programScore=" + programScore +
                ", digitScore=" + digitScore +
                ", eduScore=" + eduScore +
                '}';
    }
}
