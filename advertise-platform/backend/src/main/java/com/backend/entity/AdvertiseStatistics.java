package com.backend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.time.LocalDateTime;
import java.util.Date;

@TableName("advertise_statistics")
public class AdvertiseStatistics {

    @TableId("stat_id")
    private String statId; // 数据id

    @TableField("ad_id")
    private String adId; // 广告id

    @TableField("operation_type")
    private CONSTANT.OperationType operationType; // 访问次数

    @TableField("operation_date")
    private LocalDateTime operationDate; // 访问时间

    @TableField("author")
    private String author; // 作者

    public String getStatId() {
        return statId;
    }

    public void setStatId(String statId) {
        this.statId = statId;
    }

    public String getAdId() {
        return adId;
    }

    public void setAdId(String adId) {
        this.adId = adId;
    }

    public CONSTANT.OperationType getOperationType() {
        return operationType;
    }

    public void setOperationType(CONSTANT.OperationType operationType) {
        this.operationType = operationType;
    }

    public LocalDateTime getOperationDate() {
        return operationDate;
    }

    public void setOperationDate(LocalDateTime operationDate) {
        this.operationDate = operationDate;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public String toString() {
        return "AdvertiseStatistics{" +
                "statId='" + statId + '\'' +
                ", adId='" + adId + '\'' +
                ", operationType=" + operationType +
                ", operationDate=" + operationDate +
                ", author='" + author + '\'' +
                '}';
    }
}
