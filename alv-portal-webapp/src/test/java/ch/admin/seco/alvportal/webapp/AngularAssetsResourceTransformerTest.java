package ch.admin.seco.alvportal.webapp;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.resource.ResourceTransformerChain;

public class AngularAssetsResourceTransformerTest {

    @Test
    public void testTransform() throws IOException {
        // given
        Resource resource = new ClassPathResource("/ch/admin/seco/alvportal/webapp/sample-content.css");
        AngularAssetsResourceTransformer angularAssetsResourceTransformer = new AngularAssetsResourceTransformer("/assets", "/fonts");

        // when
        Resource transform = angularAssetsResourceTransformer.transform(
                mockedHttpServletRequest("/xxx"),
                resource,
                mockedResourceTransformerChain(resource)
        );
        // then
        String result = extractString(transform);
        assertThat(result).contains(".test {\n" +
                "    /*unquoted url*/\n" +
                "    background-image: url(/xxx/assets/nested/directory/my-picture.jpeg);\n" +
                "    /*single.quoted url*/\n" +
                "    background-image: url('/xxx/assets/my-font.woff2');\n" +
                "    /*double-quoted url*/\n" +
                "    background-image: url(\"/xxx/assets/my-picture.jpeg\");\n" +
                "    /*escaped double-quoted url*/\n" +
                "    background-image: url(\\\"/xxx/assets/my-picture.jpeg\\\");\n" +
                "    /*escaped single-quoted*/\n" +
                "    background-image: url(\\'/xxx/assets/my-picture.jpeg\\');\n" +
                "}\n");
    }

    private String extractString(Resource transform) throws IOException {
        byte[] bytes = FileCopyUtils.copyToByteArray(transform.getInputStream());
        return new String(bytes, StandardCharsets.UTF_8);
    }

    private ResourceTransformerChain mockedResourceTransformerChain(Resource resource) throws IOException {
        ResourceTransformerChain transformerChain = mock(ResourceTransformerChain.class);
        when(transformerChain.transform(any(), any())).thenReturn(resource);
        return transformerChain;
    }

    private HttpServletRequest mockedHttpServletRequest(String value) {
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        when(httpServletRequest.getContextPath()).thenReturn(value);
        return httpServletRequest;
    }
}
