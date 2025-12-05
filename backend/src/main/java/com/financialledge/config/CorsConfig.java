package com.financialledge.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // 허용할 Origin (프론트엔드 주소)
        config.addAllowedOriginPattern("http://localhost:*");
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedOrigin("http://localhost:3001");
        
        // 허용할 HTTP 메서드
        config.addAllowedMethod("*");
        
        // 허용할 헤더
        config.addAllowedHeader("*");
        
        // 인증 정보 허용 (false로 설정하여 CORS 문제 방지)
        config.setAllowCredentials(false);
        
        // 모든 경로에 적용
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}

