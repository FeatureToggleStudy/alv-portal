CREATE TABLE avp (
  id UUID NOT NULL,
  /* TODO user UUID NOT NULL, */
  year SMALLINT NOT NULL,
  month TINYINT NOT NULL,
  beschaeftigungen CLOB,
  abwesenheiten CLOB,
  arbeitsunfaehigkeit CLOB,
  weitere_angaben CLOB,
  edit_status VARCHAR_IGNORECASE(20),
  transmission_status VARCHAR_IGNORECASE(20),
  primary key(id)
);
