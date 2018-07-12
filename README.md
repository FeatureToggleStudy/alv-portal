# Online Services

## Development Setup

### Prerequisites

* JDK 1.8 or later
* node.js 10.5.x
* npm 6.1.x

### Build

1. Execute `./mvnw clean install`.

#### Build without tests

* To skip unit tests, execute `./mvnw clean install -DskipTests`.
* To skip integration and UI E2E tests, execute `./mvnw clean install -DskipITs`.
* To skip all tests, execute `./mvnw clean install -DskipTests -DskipITs`.

#### Build incl. docker image

1. First authenticate locally against the internal docker repository as follows: `docker login alvch-dockerv2-local.jfrog.io`.
    * Once executed, the credentials will be stored permanently in your docker config file.
1. To build the image, execute `./mvnw clean install -P docker-build`
1. To build and push the image, execute `./mvnw clean install -P docker-build-push`
    * Pushing docker images locally is usually not needed. It will be performed by the CICD toolchain automatically.

### Run

### Run JAR

1. Execute `java -jar online-services-web/target/online-services-web-*.jar`.
1. Verify that the application is running by visiting the following URL: _http://localhost:8080_.

### Run docker image

1. Execute `docker run -p 8080:8080 alvch-dockerv2-local.jfrog.io/alvch/online-services:<project.version>`.
1. Verify that the application is running by visiting the following URL: _http://localhost:8080_.

### Run docker image with docker-compose (recommended approach)

1. First build the project including building of the docker image as described above.
1. Execute `docker-compose -f online-services-web/target/docker/docker-compose.yml up`. 

## Development Conventions

### Formatting

Formatting is defined by `.editorconfig` file. 

To apply this formatting automatically by IntelliJ IDEA, you need to do the following:

1. Install [EditorConfig plugin](https://plugins.jetbrains.com/plugin/7294-editorconfig)
1. Enable EditorConfig support on the *Settings -> Editor -> Code Style* page.    
