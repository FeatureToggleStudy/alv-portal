package ch.admin.seco.alvportal.webapp;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.resource.ResourceTransformer;
import org.springframework.web.servlet.resource.ResourceTransformerChain;
import org.springframework.web.servlet.resource.TransformedResource;

/**
 * Replaces the <base href> with the actual context-path
 */
public class BaseHrefResourceTransformer implements ResourceTransformer {

    @Override
    public Resource transform(HttpServletRequest request, Resource resource, ResourceTransformerChain transformerChain) throws IOException {
        resource = transformerChain.transform(request, resource);
        String filename = resource.getFilename();
        if (!"index.html".equals(StringUtils.getFilename(filename))) {
            return resource;
        }
        byte[] bytes = FileCopyUtils.copyToByteArray(resource.getInputStream());
        String content = new String(bytes, StandardCharsets.UTF_8);
        String contextPath = request.getContextPath();
        String result = content.replaceAll("<base href=\".*\">", "<base href=\"" + contextPath + "/\">");
        return new TransformedResource(resource, result.getBytes());
    }
}
