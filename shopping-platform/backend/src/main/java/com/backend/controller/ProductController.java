package com.backend.controller;

import com.backend.entity.ProductInfo;
import com.backend.service.ProductInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/product")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductInfoService productInfoService;

    @GetMapping
    public List<ProductInfo> getAllProducts() {
        List<ProductInfo> productInfoList = productInfoService.getAllProductInfo();
        logger.info("Fetched {} products", productInfoList.size());
        productInfoList.forEach(productInfo -> logger.info(productInfo.toString()));
        return productInfoList;
    }

    @GetMapping("/category")
    public List<ProductInfo> getProductsByCategory(@RequestParam String category) {
        List<ProductInfo> productInfoList = productInfoService.getAllProductInfoByCategory(category);
        logger.info("Fetched {} products in category: {}", productInfoList.size(), category);
        productInfoList.forEach(productInfo -> logger.info(productInfo.toString()));
        return productInfoList;
    }

    @PostMapping
    public List<ProductInfo> getTargetProducts(@RequestBody Map<String, String> requestBody) {
        String keyword = requestBody.get("keyword");

        if (keyword.isEmpty()) {
            return getAllProducts();
        }

        List<ProductInfo> productInfoList = productInfoService.searchProductsByKeyword(keyword);
        logger.info("Searched products with keyword: {}, found {} products", keyword, productInfoList.size());
        return productInfoList;
    }

}
