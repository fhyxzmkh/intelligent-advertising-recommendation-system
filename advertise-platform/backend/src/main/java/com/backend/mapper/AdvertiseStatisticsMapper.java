package com.backend.mapper;

import com.backend.entity.AdvertiseStatistics;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdvertiseStatisticsMapper extends BaseMapper<AdvertiseStatistics> {

    List<AdvertiseStatistics> selectByAuthor(@Param("author") String author);

    Integer selectClickedCount(@Param("adId") String adId);

    Integer selectShowedCount(@Param("adId") String adId);

}
