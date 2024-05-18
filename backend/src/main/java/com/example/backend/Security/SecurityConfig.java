package com.example.backend.Security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Getter
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.authorizeHttpRequests(config -> config
                        .requestMatchers("/cars/all").permitAll()
                        .requestMatchers("/security/sign-up").permitAll()
                        .requestMatchers("/security/sign-in").permitAll()
                        .requestMatchers("/security").permitAll()
                        .requestMatchers("/users/by-status").hasAuthority("ADMIN")
                        .requestMatchers("/cars/create").hasAuthority("COMPANY")
                        .requestMatchers("/cars/{registrationNumber}").authenticated()
                        .requestMatchers("/cars/filter").permitAll()
                        .requestMatchers("/users/create").permitAll()
                        .requestMatchers("/users/request-company").hasAuthority("USER")
                        .requestMatchers("/users/approve-company").hasAuthority("ADMIN")
                        .requestMatchers("/users/decline-company").hasAuthority("ADMIN")
                        .anyRequest().authenticated())
                .formLogin(withDefaults())
                        .logout(
                                logout -> logout
                                        .deleteCookies("JSESSIONID")
                                        .invalidateHttpSession(false)
                                        .logoutUrl("/logout")
                                        .permitAll()
                                        .logoutSuccessHandler(customLogoutSuccessHandler())
                        )
                        .exceptionHandling(AbstractHttpConfigurer::disable);

        httpSecurity.csrf(csrf -> csrf.disable());

        httpSecurity.httpBasic(withDefaults());

        httpSecurity.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        return httpSecurity.build();

    }

    @Bean
    CorsConfigurationSource corsConfigurationSource()
    {
        CorsConfiguration configuration=new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");

        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }

    @Bean
    public LogoutSuccessHandler customLogoutSuccessHandler() {
        return new LogoutSuccessHandler() {
            @Override
            public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, org.springframework.security.core.Authentication authentication) throws IOException {
                response.setStatus(HttpServletResponse.SC_OK);
                response.setContentType("application/json");
                response.getWriter().write("{\"message\":\"Logged out successfully\"}");
                response.getWriter().flush();
            }
        };
    }

}
