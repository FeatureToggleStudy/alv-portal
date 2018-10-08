package ch.admin.seco.alvportal.webapp;


import java.io.IOException;
import java.time.Duration;

import org.springframework.boot.autoconfigure.web.ResourceProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.web.filter.ForwardedHeaderFilter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    private static final String WEB_APP_LOCATION = "classpath:/ch/admin/seco/alvportal/ui/";

    private final ResourceProperties resourceProperties;

    public WebConfiguration(ResourceProperties resourceProperties) {
        this.resourceProperties = resourceProperties;
    }

    @Bean
    FilterRegistrationBean forwardedHeaderFilter() {
        FilterRegistrationBean<ForwardedHeaderFilter> filterRegBean = new FilterRegistrationBean<>();
        filterRegBean.setFilter(new ForwardedHeaderFilter());
        filterRegBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return filterRegBean;
    }

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Duration cachePeriod = this.resourceProperties.getCache().getPeriod();
        CacheControl cacheControl = this.resourceProperties.getCache()
                .getCachecontrol().toHttpCacheControl();
        registry.addResourceHandler("/**")
                .addResourceLocations(WEB_APP_LOCATION)
                .setCachePeriod(getSeconds(cachePeriod))
                .setCacheControl(cacheControl)
                .resourceChain(true)
                .addResolver(new SinglePageAppResourceResolver());
    }

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/", "index.html");
    }

    private Integer getSeconds(Duration cachePeriod) {
        return (cachePeriod != null) ? (int) cachePeriod.getSeconds() : null;
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
