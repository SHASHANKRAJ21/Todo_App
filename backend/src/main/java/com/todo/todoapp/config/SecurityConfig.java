package com.todo.todoapp.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // 🔥 Disable CSRF (important for frontend API calls)
            .csrf(csrf -> csrf.disable())

            // 🔥 Enable CORS with your config
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // 🔥 Authorization rules
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()   // login/signup allowed
                .requestMatchers("/todos/**").permitAll()  // allow todos (FIXED)
                .anyRequest().authenticated()              // others need auth
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // 🔥 Your frontend URL
        config.setAllowedOrigins(List.of(
            "https://todo-app-cljb.vercel.app"
        ));

        config.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        config.setAllowedHeaders(List.of("*"));

        // 🔥 Important for cookies / auth headers
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}