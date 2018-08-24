package ch.admin.seco.onlineservices;

import ch.admin.seco.onlineservices.webapp.config.SwaggerConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.io.BufferedWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * This test is a special kind of test actually not testing any functionality.
 * Its solely purpose download and save the Swagger JSON specification
 * that is available only after the application startup (exposed by Springfox library).
 * In order to fake the real application startup, a Spring test loading the application context is used.
 * This allows us to get the Swagger JSON already during the build process - just by running a single test.
 */
@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {OnlineServicesApplication.class, SwaggerConfig.class})
@AutoConfigureMockMvc
public class DownloadSwaggerJsonTest {

    private final String SWAGGER_JSON_URL = "/docs/api/swagger/json";
    private final String SWAGGER_JSON_OUTPUT_DIR = "target/docs/api/swagger";

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void createSpringfoxSwaggerJson() throws Exception {

        MvcResult mvcResult = this.mockMvc.perform(get(SWAGGER_JSON_URL)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        MockHttpServletResponse response = mvcResult.getResponse();
        String swaggerJson = response.getContentAsString();
        Files.createDirectories(Paths.get(SWAGGER_JSON_OUTPUT_DIR));
        try (BufferedWriter writer = Files.newBufferedWriter(Paths.get(SWAGGER_JSON_OUTPUT_DIR, "swagger.json"), StandardCharsets.UTF_8)) {
            writer.write(swaggerJson);
        }
    }

}
