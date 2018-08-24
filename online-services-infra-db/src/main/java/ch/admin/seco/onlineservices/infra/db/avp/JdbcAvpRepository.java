package ch.admin.seco.onlineservices.infra.db.avp;

import ch.admin.seco.onlineservices.model.avp.AvpForm;
import ch.admin.seco.onlineservices.model.avp.Beschaeftigungen;
import ch.admin.seco.onlineservices.model.common.EditStatus;
import ch.admin.seco.onlineservices.model.common.TransmissionStatus;
import ch.admin.seco.onlineservices.repository.avp.AvpRepository;
import ch.admin.seco.onlineservices.repository.error.DomainException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Repository
public class JdbcAvpRepository implements AvpRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final ObjectMapper objectMapper;

    private static final String CREATE_QUERY = "INSERT INTO avp (id, year, month, edit_status, transmission_status) VALUES (:id, :year, :month, :edit_status, :transmission_status)";
    private static final String GET_QUERY = "SELECT id, year, month, edit_status, transmission_status FROM avp WHERE id = (:id)";
    private static final String UPDATE_EDIT_STATUS_QUERY = "UPDATE avp SET edit_status = (:edit_status) WHERE id = (:id)";
    private static final String UPDATE_TRANSMISSION_STATUS_QUERY = "UPDATE avp SET transmission_status = (:transmission_status) WHERE id = (:id)";
    private static final String SAVE_BESCHAEFTIGUNGEN_QUERY = "UPDATE avp SET beschaeftigungen = (:beschaeftigungen) WHERE id = (:id)";
    private static final String GET_BESCHAEFTIGUNGEN_QUERY = "SELECT beschaeftigungen FROM avp WHERE id = (:id)";

    public JdbcAvpRepository(NamedParameterJdbcTemplate jdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    public AvpForm createAvpForm(AvpForm avpForm) {
        avpForm.setId(UUID.randomUUID().toString());
        avpForm.setEditStatus(EditStatus.NEW);
        avpForm.setTransmissionStatus(TransmissionStatus.NOT_TRANSMITTED);

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("id", avpForm.getId());
        paramMap.put("year", avpForm.getYear());
        paramMap.put("month", avpForm.getMonth());
        paramMap.put("edit_status", avpForm.getEditStatus().getValue());
        paramMap.put("transmission_status", avpForm.getTransmissionStatus().getValue());

        jdbcTemplate.update(CREATE_QUERY, paramMap);

        return avpForm;
    }

    @Override
    public Optional<AvpForm> getAvpForm(String avpFormId) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("id", avpFormId);

        try {
            return Optional.of(jdbcTemplate.queryForObject(GET_QUERY, paramMap, new AvpFormMapper()));
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public void saveBeschaeftigungen(String avpFormId, Beschaeftigungen beschaeftigungen) {

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("id", avpFormId);
        try {
            paramMap.put("beschaeftigungen", objectMapper.writeValueAsString(beschaeftigungen));
        } catch (JsonProcessingException e) {
            throw new DomainException("Can't convert 'beschaeftigungen' to JSON string", e);
        }

        jdbcTemplate.update(SAVE_BESCHAEFTIGUNGEN_QUERY, paramMap);

    }

    @Override
    public Beschaeftigungen getBeschaeftigungen(String avpFormId) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("id", avpFormId);

        String beschaeftigungenJson = (String) jdbcTemplate.queryForObject(GET_BESCHAEFTIGUNGEN_QUERY, paramMap, String.class);
        if (beschaeftigungenJson == null) {
            return null;
        }

        try {
            return objectMapper.readValue(beschaeftigungenJson, Beschaeftigungen.class);
        } catch (IOException e) {
            throw new DomainException("Can't convert 'beschaeftigungen' JSON string to Java", e);
        }
    }

    @Override
    public void setEditStatus(String avpFormId, EditStatus editStatus) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("id", avpFormId);
        paramMap.put("edit_status", editStatus.getValue());

        jdbcTemplate.update(UPDATE_EDIT_STATUS_QUERY, paramMap);
    }

    @Override
    public void setTransmissionStatus(String avpFormId, TransmissionStatus transmissionStatus) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("id", avpFormId);
        paramMap.put("transmission_status", transmissionStatus.getValue());

        jdbcTemplate.update(UPDATE_TRANSMISSION_STATUS_QUERY, paramMap);

    }

    private static final class AvpFormMapper implements RowMapper<AvpForm> {
        public AvpForm mapRow(ResultSet rs, int rowNum) throws SQLException {
            AvpForm avpForm = new AvpForm();
            avpForm.setId(rs.getString("id"));
            avpForm.setYear(rs.getShort("year"));
            avpForm.setMonth(rs.getByte("month"));
            avpForm.setEditStatus(EditStatus.fromValue(rs.getString("edit_status")));
            avpForm.setTransmissionStatus(TransmissionStatus.fromValue(rs.getString("transmission_status")));
            return avpForm;
        }
    }
}
