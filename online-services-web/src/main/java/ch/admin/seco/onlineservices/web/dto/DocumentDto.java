package ch.admin.seco.onlineservices.web.dto;

public class DocumentDto {

    private DocumentTypeDto documentType;

    private String name;

    private byte[] content;

    public DocumentTypeDto getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentTypeDto documentType) {
        this.documentType = documentType;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getName() {
        return name;
    }

    public byte[] getContent() {
        return content;
    }
}
