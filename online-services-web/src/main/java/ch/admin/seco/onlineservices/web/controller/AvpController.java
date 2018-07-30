package ch.admin.seco.onlineservices.web.controller;

import ch.admin.seco.onlineservices.web.dto.BeschaeftigungenDto;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.slf4j.LoggerFactory.getLogger;

@Controller
@RequestMapping("/avp")
public class AvpController {

    private static Logger log = getLogger(AvpController.class);

    @PostMapping(value = "/beschaeftigungen", params = "month")
    @ResponseStatus(HttpStatus.CREATED)
    public void submitBeschaeftigungenForm(@RequestParam byte month, @RequestBody @Valid BeschaeftigungenDto beschaeftigungenDto) {
        log.info("Submitting AVP Beschaeftigungen form for month {} ...", month);
        log.info("AVP Beschaeftigungen form for month {} successfully submitted.", month);
    }

}
