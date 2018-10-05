package ch.admin.seco.alvportal.webapp;


import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    private static final String WEB_APP_LOCATION = "classpath:/ch/admin/seco/alvportal/ui/";

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations(WEB_APP_LOCATION)
                .setCacheControl(CacheControl.maxAge(7, TimeUnit.DAYS))
                .resourceChain(true)
                .addResolver(new SinglePageAppResourceResolver());
    }

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/", "index.html");
    }

    class SinglePageAppResourceResolver extends PathResourceResolver {

        private static final String FRONT_CONTROLLER = "/index.html";

        @Override
        protected Resource getResource(String resourcePath, Resource location) throws IOException {
            Resource resource = super.getResource(resourcePath, location);
            if (resource != null) {
                return resource;
            }
            final Resource indexLocation = location.createRelative(FRONT_CONTROLLER);
            if (indexLocation.exists() && indexLocation.isReadable()) {
                return indexLocation;
            }
            return null;
        }

    }
}
