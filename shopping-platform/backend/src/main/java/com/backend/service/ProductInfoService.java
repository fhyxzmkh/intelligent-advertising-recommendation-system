package com.backend.service;

import com.backend.entity.ProductInfo;
import com.backend.mapper.ProductInfoMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ProductInfoService {

    @Autowired
    private ProductInfoMapper productInfoMapper;

    public List<ProductInfo> getAllProductInfo() {
        return productInfoMapper.selectList(null);
    }

    public int insertProductInfo(ProductInfo productInfo) {
        return productInfoMapper.insert(productInfo);
    }

    public List<ProductInfo> searchProductsByKeyword(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return Collections.emptyList();
        }
        keyword = keyword.trim();

        QueryWrapper<ProductInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("product_name", keyword)
                .or()
                .like("product_description", keyword);
        return productInfoMapper.selectList(queryWrapper);
    }

}
