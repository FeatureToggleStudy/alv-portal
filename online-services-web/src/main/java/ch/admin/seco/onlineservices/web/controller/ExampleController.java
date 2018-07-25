package ch.admin.seco.onlineservices.web.controller;

import org.slf4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.slf4j.LoggerFactory.getLogger;

@RestController
public class ExampleController {

    private static Logger log = getLogger(ExampleController.class);

    @RequestMapping("/hello")
    public String home() {
        log.info("Serving /hello");
        return "Hello World";
    }

    @RequestMapping(value = "/hello", params = "error")
    public String homeWithError() throws Exception {
        log.info("Serving /hello");
        throw new IllegalStateException("hello world failed");
    }
}
