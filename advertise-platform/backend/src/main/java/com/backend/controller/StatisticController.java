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

    @GetMapping("/my-statistics")
    public List<AdvertiseStatistics> getMyStatistics(@RequestParam("author") String author) {
        return advertiseStatisticsService.getStatisticsByAuthor(author);
    }

    @GetMapping("/all-details")
    public List<AdvertiseInfo> getAllAdvertiseDetails() {
        List<AdvertiseInfo> advertiseInfos = advertiseInfoService.getAllAdvertiseInfo();

        for (AdvertiseInfo advertiseInfo : advertiseInfos) {
            advertiseInfo.setClickedCount(
                    advertiseStatisticsService.getClickedCount(advertiseInfo.getAdId())
            );
            advertiseInfo.setShowedCount(
                    advertiseStatisticsService.getShowedCount(advertiseInfo.getAdId())
            );
        }

        return advertiseInfos;
    }

    @GetMapping("/my-details")
    public List<AdvertiseInfo> getMyAdvertiseDetails(@RequestParam("uid") String uid) {
        List<AdvertiseInfo> advertiseInfos = advertiseInfoService.getAdvertiseInfoByAuthor(uid);

        for (AdvertiseInfo advertiseInfo : advertiseInfos) {
            advertiseInfo.setClickedCount(
                    advertiseStatisticsService.getClickedCount(advertiseInfo.getAdId())
            );
            advertiseInfo.setShowedCount(
                    advertiseStatisticsService.getShowedCount(advertiseInfo.getAdId())
            );
        }

        return advertiseInfos;
    }


    @GetMapping("/click")
    public void clickAdvertise(@RequestParam String adId) {
        AdvertiseInfo clickedAd = advertiseInfoService.getAdvertiseInfoById(adId);

        if (clickedAd == null) return;
        //System.out.println("Advertise clicked: " + clickedAd);

        AdvertiseStatistics newData = new AdvertiseStatistics();
        newData.setAdId(adId);
        newData.setOperationDate(LocalDateTime.now());
        newData.setStatId(UUID.randomUUID().toString());
        newData.setOperationType(CONSTANT.OperationType.CLICK);

        newData.setAuthor(advertiseInfoService.getAdvertiseInfoById(adId).getAuthor());

        advertiseStatisticsService.InsertAdvertiseStatistics(newData);
    }

    @GetMapping("/show")
    public void showAdvertise(@RequestParam String adId) {
        AdvertiseInfo showedAd = advertiseInfoService.getAdvertiseInfoById(adId);

        if (showedAd == null) return;
        //System.out.println("Advertise clicked: " + showedAd);

        AdvertiseStatistics newData = new AdvertiseStatistics();
        newData.setAdId(adId);
        newData.setOperationDate(LocalDateTime.now());
        newData.setStatId(UUID.randomUUID().toString());
        newData.setOperationType(CONSTANT.OperationType.SHOW);

        newData.setAuthor(advertiseInfoService.getAdvertiseInfoById(adId).getAuthor());

        advertiseStatisticsService.InsertAdvertiseStatistics(newData);
    }
}
