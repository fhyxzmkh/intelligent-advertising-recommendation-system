package com.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import java.util.Date;

@TableName("advertise_statistics")
public class AdvertiseStatistics {

    @TableField("stat_id")
    private String statId; // 数据id

    @TableField("ad_id")
    private String adId; // 广告id

    @TableField("click_count")
    private Integer clickCount; // 访问次数

    @TableField("click_date")
    private Date clickDate; // 访问时间

    @TableField("revenue")
    private Integer revenue; // 广告总收入

}
