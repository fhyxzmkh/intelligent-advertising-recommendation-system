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

    @TableField("drop_location")
    private CONSTANT.DropLocation dropLocation; // 广告位置

    @TableField("is_activated")
    private boolean isActivated; // 是否激活

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

    public CONSTANT.DropLocation getDropLocation() {
        return dropLocation;
    }

    public void setDropLocation(CONSTANT.DropLocation dropLocation) {
        this.dropLocation = dropLocation;
    }

    public boolean isActivated() {
        return isActivated;
    }

    public void setActivated(boolean activated) {
        isActivated = activated;
    }

    @Override
    public String toString() {
        return "AdvertiseInfo{" +
                "adId='" + adId + '\'' +
                ", adName='" + adName + '\'' +
                ", adCategory='" + adCategory + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                ", dropLocation=" + dropLocation +
                ", isActivated=" + isActivated +
                '}';
    }
}
