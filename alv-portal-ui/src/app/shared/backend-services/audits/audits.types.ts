interface AuditData {
  remoteAddress: string;
  sessionId: string;
  type: string;
  message: string;
  details: string;
}

interface Audit {
  data: AuditData;
  principal: string;
  timestamp: string;
  type: string;
}
