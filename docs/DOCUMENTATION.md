# Documentation

## Project Specification

A complete project specification can be found on [Online Services Wiki](https://alv-ch.atlassian.net/wiki/spaces/OS/overview).

## Project Documentation

### Maintain

The system architecture documentation is maintained together with the project code base in the **_online-services-docs_** module.

The project documentation maintained in the project codebase consists of:
* **System Architecture** (_online-services-docs/src/main/system-architecture__)
* **Installation and Operation Guide** (_online-services-docs/src/main/installation-operation-guide__)

#### Build

Just run `../mvnw clean package` from the _online-services-docs_ module.
* A complete documentation is generated afterwards in _target/generated-docs_ folder.
* Built documentation inherits the Maven project version. 

#### Browse / Run

* Open a built documentation directly (located in _target/generated-docs_) on your local file system.
* or access the documentation under the following URLs:
  * _<app-url>/docs/system-architecture/html_
  * _<app-url>/docs/system-architecture/pdf_
* To check the current state of system architecture, visit: 
  * [http://dev.job-room.ch:8999/docs/system-architecture/html](http://dev.job-room.ch:8999/docs/system-architecture/html)   

## API Documentation

API Documentation is available in the following form:

### Swagger JSON

Available during the application runtime at:
* _<app-url>/docs/api/swagger/json_
* To check the current state of API documentation, visit: [http://dev.job-room.ch:8999/docs/api/swagger/json](http://dev.job-room.ch:8999/docs/api/swagger/json)

### Swagger UI

Available during the application runtime at:
* _<app-url>/swagger-ui.html_
* To check the current state of API documentation, visit: [http://dev.job-room.ch:8999/swagger-ui.html](http://dev.job-room.ch:8999/swagger-ui.html)
