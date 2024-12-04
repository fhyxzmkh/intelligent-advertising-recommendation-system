package com.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

@TableName("advertise_info")
public class AdvertiseInfo {

    @TableId("ad_id")
    private String AdvertiseId;

    @TableField("ad_name")
    private String AdvertiseName;

    @TableField("ad_category")
    private String AdvertiseCategory;

    @TableField("img_url")
    private String ImgUrl;

    public String getAdvertiseId() {
        return AdvertiseId;
    }

    public void setAdvertiseId(String advertiseId) {
        AdvertiseId = advertiseId;
    }

    public String getAdvertiseName() {
        return AdvertiseName;
    }

    public void setAdvertiseName(String advertiseName) {
        AdvertiseName = advertiseName;
    }

    public String getAdvertiseCategory() {
        return AdvertiseCategory;
    }

    public void setAdvertiseCategory(String advertiseCategory) {
        AdvertiseCategory = advertiseCategory;
    }

    public String getImgUrl() {
        return ImgUrl;
    }

    public void setImgUrl(String imgUrl) {
        ImgUrl = imgUrl;
    }

    @Override
    public String toString() {
        return "AdvertiseInfo{" +
                "AdvertiseId='" + AdvertiseId + '\'' +
                ", AdvertiseName='" + AdvertiseName + '\'' +
                ", AdvertiseCategory='" + AdvertiseCategory + '\'' +
                ", ImgUrl='" + ImgUrl + '\'' +
                '}';
    }
}
