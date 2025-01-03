package com.backend.mapper;

import com.backend.entity.AdvertiseInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdvertiseInfoMapper extends BaseMapper<AdvertiseInfo> {

    List<AdvertiseInfo> selectByCategory(@Param("category") String category);

    List<AdvertiseInfo> selectByAuthor(@Param("author") String author);

    List<AdvertiseInfo> selectAll();

}
