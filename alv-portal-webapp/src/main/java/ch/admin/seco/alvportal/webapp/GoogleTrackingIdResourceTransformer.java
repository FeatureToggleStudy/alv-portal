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

public class GoogleTrackingIdResourceTransformer implements ResourceTransformer {

    private final String trackingIdToReplace;

    private final String replacementTrackingId;

    GoogleTrackingIdResourceTransformer(String trackingIdToReplace, String replacementTrackingId) {
        this.trackingIdToReplace = trackingIdToReplace;
        this.replacementTrackingId = replacementTrackingId;
    }

    @Override
    public Resource transform(HttpServletRequest request, Resource
            resource, ResourceTransformerChain transformerChain) throws IOException {
        resource = transformerChain.transform(request, resource);
        String filename = resource.getFilename();
        String filenameExtension = StringUtils.getFilenameExtension(filename);
        if (filenameExtension == null || !filenameExtension.matches("js")) {
            return resource;
        }
        byte[] bytes = FileCopyUtils.copyToByteArray(resource.getInputStream());
        String content = new String(bytes, StandardCharsets.UTF_8);
        String result = content.replaceAll("gaTrackingId:\"" + this.trackingIdToReplace + "\"", String.format("gaTrackingId:\"%s\"", this.replacementTrackingId));
        return new TransformedResource(resource, result.getBytes());
    }
}
