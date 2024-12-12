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

    @TableField("unit_price")
    private Integer unitPrice; // 广告单价

    @TableField("author")
    private String author;

    @TableField("clicked_count")
    private Integer clickedCount;

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

    public Integer getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Integer unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getClickedCount() {
        return clickedCount;
    }

    public void setClickedCount(Integer clickedCount) {
        this.clickedCount = clickedCount;
    }

}
