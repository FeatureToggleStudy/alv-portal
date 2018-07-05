package ch.admin.seco.onlineservices;

import static org.slf4j.LoggerFactory.getLogger;

import org.slf4j.Logger;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExampleExceptionThrowingController {

    private static Logger log = getLogger(ExampleExceptionThrowingController.class);

    @RequestMapping("/errorTest")
    public void exceptionLogging() throws Exception {
        log.info("Handling exception logging");
        throw new Exception("error Test !");
    }
}
