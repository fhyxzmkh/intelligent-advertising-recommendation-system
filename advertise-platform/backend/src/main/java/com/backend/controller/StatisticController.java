package com.backend.controller;


import com.backend.entity.AdvertiseInfo;
import com.backend.entity.AdvertiseStatistics;
import com.backend.entity.CONSTANT;
import com.backend.service.AdvertiseInfoService;
import com.backend.service.AdvertiseStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/statistic")
public class StatisticController {

    @Autowired
    private AdvertiseInfoService advertiseInfoService;

    @Autowired
    private AdvertiseStatisticsService advertiseStatisticsService;

    @GetMapping("/all")
    public List<AdvertiseStatistics> getAllStatistics() {
        return advertiseStatisticsService.getAllStatistics();
    }

    @GetMapping("/details")
    public List<AdvertiseInfo> getAllAdvertiseDetails() {
        List<AdvertiseInfo> advertiseInfos = advertiseInfoService.getAllAdvertiseInfo();

        for (AdvertiseInfo advertiseInfo : advertiseInfos) {
            advertiseInfo.setClickedCount(
                    advertiseStatisticsService.getClickedCount(advertiseInfo.getAdId())
            );
        }

        return advertiseInfos;
    }

    @GetMapping("/my-statistics")
    public List<AdvertiseStatistics> getMyStatistics(@RequestParam("author") String author) {
        return advertiseStatisticsService.getStatisticsByAuthor(author);
    }

    @GetMapping("/click")
    public void clickAdvertise(@RequestParam String adId) {
        AdvertiseInfo clickedAd = advertiseInfoService.getAdvertiseInfoById(adId);

        if (clickedAd == null) return;

        System.out.println("Advertise clicked: " + clickedAd);

        AdvertiseStatistics newData = new AdvertiseStatistics();
        newData.setAdId(adId);
        newData.setOperationDate(LocalDateTime.now());;
        newData.setStatId(UUID.randomUUID().toString());
        newData.setOperationType(CONSTANT.OperationType.CLICK);

        advertiseStatisticsService.InsertAdvertiseStatistics(newData);
    }
}
