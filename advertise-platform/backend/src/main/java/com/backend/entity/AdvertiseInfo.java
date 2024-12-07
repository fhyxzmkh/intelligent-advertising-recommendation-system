package com.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

@TableName("advertise_info")
public class AdvertiseInfo {

    @TableId("ad_id")
    private String adId;

    @TableField("ad_name")
    private String adName;

    @TableField("ad_category")
    private String adCategory;

    @TableField("img_url")
    private String imgUrl;

    public String getAdId() {
        return adId;
    }

    public void setAdId(String adId) {
        this.adId = adId;
    }

    public String getAdName() {
        return adName;
    }

    public void setAdName(String adName) {
        this.adName = adName;
    }

    public String getAdCategory() {
        return adCategory;
    }

    public void setAdCategory(String adCategory) {
        this.adCategory = adCategory;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    @Override
    public String toString() {
        return "AdvertiseInfo{" +
                "adId='" + adId + '\'' +
                ", adName='" + adName + '\'' +
                ", adCategory='" + adCategory + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                '}';
    }
}
