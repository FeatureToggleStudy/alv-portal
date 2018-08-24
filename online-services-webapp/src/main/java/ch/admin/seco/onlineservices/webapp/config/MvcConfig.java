package ch.admin.seco.onlineservices.webapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/docs/system-architecture/html")
                .setViewName("forward:/system-architecture/system-architecture.html");
        registry.addViewController("/docs/system-architecture/pdf")
                .setViewName("forward:/system-architecture/system-architecture.pdf");
    }

}
