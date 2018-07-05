package ch.admin.seco.onlineservices;

import static org.slf4j.LoggerFactory.getLogger;

import org.slf4j.Logger;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExampleController {

    private static Logger log = getLogger(ExampleController.class);

    @RequestMapping("/")
    public String home() {
        log.info("Handling home");
        return "Hello World";
    }
}
