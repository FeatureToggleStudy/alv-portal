package ch.admin.seco.onlineservices.webapp.dto.avp;

import javax.validation.constraints.Size;

public class AddressDto {

    @Size(max = 100)
    private String street;

    @Size(max = 6)
    private String houseNumber;

    @Size(max = 10)
    private String zip;

    @Size(max = 100)
    private String city;

    private String country;

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
