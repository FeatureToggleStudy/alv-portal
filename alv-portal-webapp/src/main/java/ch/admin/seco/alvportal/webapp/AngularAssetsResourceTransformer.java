package ch.admin.seco.alvportal.webapp;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.resource.ResourceTransformer;
import org.springframework.web.servlet.resource.ResourceTransformerChain;
import org.springframework.web.servlet.resource.TransformedResource;

/**
 * Find all occurrences of url functions that refer to an asset in .js and .css files and
 * prefix the url with the context-path from the request.
 *
 * Hint: Only replace assets that start with / such as '/assets' or '/fonts'. This is considered as a absolute path.
 * Relative paths such as 'assets/my-file.png' must not get replaced here since the browser
 * is going respect the <base href> and prefix the url for relative paths
 */
public class AngularAssetsResourceTransformer implements ResourceTransformer {

    private static final Logger LOGGER = LoggerFactory.getLogger(AngularAssetsResourceTransformer.class);

    private List<String> assets = new ArrayList<>();

    AngularAssetsResourceTransformer(String... assets) {
        this.assets.addAll(Arrays.asList(assets));
    }

    @Override
    public Resource transform(HttpServletRequest request, Resource
            resource, ResourceTransformerChain transformerChain) throws IOException {
        resource = transformerChain.transform(request, resource);
        String filename = resource.getFilename();
        String filenameExtension = StringUtils.getFilenameExtension(filename);
        if (filenameExtension == null || !filenameExtension.matches("js|css")) {
            return resource;
        }
        byte[] bytes = FileCopyUtils.copyToByteArray(resource.getInputStream());
        String content = new String(bytes, StandardCharsets.UTF_8);
        String result = this.assets.stream()
                .peek(a -> LOGGER.trace("About to search and replace url functions starting with asset: {} in file: {}", a, filename))
                .reduce(content, (asset, r) -> this.replaceUrlLink(asset, r, request.getContextPath()));
        return new TransformedResource(resource, result.getBytes());
    }

    private String replaceUrlLink(String content, String assetName, String contextPath) {
        Pattern pattern = Pattern.compile("url\\((\\\\?[\"']?)(" + assetName + "/[^)]+)\\)");
        Matcher m = pattern.matcher(content);
        StringBuffer sb = new StringBuffer(content.length());
        while (m.find()) {
            LOGGER.trace("Found url function link: {} ", m.group(0));
            m.appendReplacement(sb, String.format("url($1%s$2)", contextPath));
        }
        m.appendTail(sb);
        return sb.toString();
    }

}
