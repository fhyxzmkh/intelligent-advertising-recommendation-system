package com.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class NewsController {

    private final WebClient webClient;

    public NewsController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://whyta.cn").build();
    }

    @GetMapping("/newsList")
    public Map<String, Object> getNewsList(@RequestParam(value = "word", required = false) String word) {
        // 请求外部API
        String apiUrl = "/api/tx/generalnews?key=f922bcb04085&num=30";

        if (word != null && !word.isEmpty()) {
            apiUrl += "&word=" + word;
        }

        Map<String, Object> response = this.webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToMono(Map.class)
                .block(); // 同步获取结果

        // 只提取 "newsList"
        if (response != null && response.containsKey("result")) {
            Map<String, Object> result = (Map<String, Object>) response.get("result");
            return Map.of("newslist", result.get("newslist"));
        }
        // 如果请求失败，返回空结果
        return Map.of("newslist", null);
    }
}
