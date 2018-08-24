package ch.admin.seco.onlineservices.webapp.controller.avp;

import ch.admin.seco.onlineservices.model.avp.AvpForm;
import ch.admin.seco.onlineservices.model.avp.Beschaeftigungen;
import ch.admin.seco.onlineservices.repository.error.FormNotFoundException;
import ch.admin.seco.onlineservices.service.avp.AvpService;
import ch.admin.seco.onlineservices.webapp.dto.avp.AvpFormDto;
import ch.admin.seco.onlineservices.webapp.dto.avp.BeschaeftigungenDto;
import com.google.common.base.Preconditions;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

import static org.slf4j.LoggerFactory.getLogger;

@RestController
@RequestMapping("/avp")
public class AvpController {

    private static Logger log = getLogger(AvpController.class);

    @Autowired
    private final AvpService avpService;

    @Autowired
    private ModelMapper modelMapper;

    public AvpController(AvpService avpService) {
        this.avpService = avpService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AvpFormDto createAvpForm(@RequestBody @Valid AvpFormDto avpFormDto) {
        Preconditions.checkArgument(avpFormDto != null, "avpForm argument must not be null");

        log.debug("Creating AVP form for {}/{} ...", avpFormDto.getYear(), avpFormDto.getMonth());

        AvpForm createdAvpForm = avpService.createAvpForm(convertToEntity(avpFormDto));

        log.debug("AVP form for {}/{} successfully created. Form id: {}", createdAvpForm.getYear(), createdAvpForm.getMonth(), createdAvpForm.getId());
        return convertToDto(createdAvpForm);
    }

    @GetMapping(value = "/{avpFormId}")
    public AvpFormDto getAvpForm(@PathVariable String avpFormId) {
        log.debug("Retrieving AVP form: form id: ", avpFormId);

        Preconditions.checkArgument(!StringUtils.isEmpty(avpFormId), "avpFormId argument must not be null");

        Optional<AvpForm> avpFormOptional = avpService.getAvpForm(avpFormId);
        if (!avpFormOptional.isPresent()) {
            throw new FormNotFoundException(avpFormId);
        }

        log.debug("AVP form successfully retrieved. Form id: {}", avpFormOptional.get().getId());
        return convertToDto(avpFormOptional.get());
    }

    @PutMapping(value = "/{avpFormId}/beschaeftigungen")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void saveBeschaeftigungen(@PathVariable String avpFormId, @RequestBody @Valid BeschaeftigungenDto beschaeftigungenDto) {
        log.debug("AVP Form Id: {}: Saving AVP Beschaeftigungen ...", avpFormId);

        Preconditions.checkArgument(!StringUtils.isEmpty(avpFormId), "avpFormId argument must not be null");
        Preconditions.checkArgument(beschaeftigungenDto != null, "beschaeftigungen argument must not be null");

        avpService.saveBeaschaftigungen(avpFormId, convertToEntity(beschaeftigungenDto));

        log.debug("AVP Form Id: {}: Beschaeftigungen successfully saved. ", avpFormId);
    }

    @GetMapping(value = "/{avpFormId}/beschaeftigungen")
    public BeschaeftigungenDto getBeschaeftigungen(@PathVariable String avpFormId) {
        log.debug("AVP Form Id: {}: Retrieving Beschaeftigungen...", avpFormId);

        Preconditions.checkArgument(!StringUtils.isEmpty(avpFormId), "avpFormId argument must not be null");

        BeschaeftigungenDto beschaeftigungenDto = convertToDto(avpService.getBeschaeftigungen(avpFormId));
        log.debug("AVP Form Id: {}: Beschaeftigungen successfully retrieved.", avpFormId);
        return beschaeftigungenDto;
    }

    @PostMapping(value = "/{avpFormId}/transmit")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void transmit(@PathVariable String avpFormId) {
        log.debug("Transmitting AVP form: Id: {} ...", avpFormId);

        Preconditions.checkArgument(!StringUtils.isEmpty(avpFormId), "avpFormId argument must not be null");

        avpService.transmit(avpFormId);
        log.debug("AVP form: id: {} successfully transmitted.", avpFormId);
    }

    private AvpForm convertToEntity(AvpFormDto avpFormDto) {
        if (avpFormDto == null) {
            return new AvpForm();
        }
        // TODO replace modelMapper with real mapping logic
        return modelMapper.map(avpFormDto, AvpForm.class);
    }

    private AvpFormDto convertToDto(AvpForm avpForm) {
        if (avpForm == null) {
            return new AvpFormDto();
        }
        // TODO replace modelMapper with real mapping logic
        return modelMapper.map(avpForm, AvpFormDto.class);
    }

    private Beschaeftigungen convertToEntity(BeschaeftigungenDto beschaeftigungenDto) {
        if (beschaeftigungenDto == null) {
            return new Beschaeftigungen();
        }
        // TODO replace modelMapper with real mapping logic
        return modelMapper.map(beschaeftigungenDto, Beschaeftigungen.class);
    }

    private BeschaeftigungenDto convertToDto(Beschaeftigungen beschaeftigungen) {
        if (beschaeftigungen == null) {
            return new BeschaeftigungenDto();
        }
        // TODO replace modelMapper with real mapping logic
        return modelMapper.map(beschaeftigungen, BeschaeftigungenDto.class);
    }

}
