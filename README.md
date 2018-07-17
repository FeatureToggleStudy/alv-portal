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
1. To build the image, execute `./mvnw clean install -P docker`
1. To build and push the image, execute `./mvnw clean install -P docker -Ddocker-push`
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
1. Execute `docker-compose -f online-services-web/target/docker-compose/docker-compose.yml up`.
1. Verify that the application is running by visiting the following URL: _http://localhost:8080_.

### Run docker image in docker swarm mode (locally)

1. Execute `docker swarm init`
* Execute only once. This command will initialize a docker swarm cluster on your localhost.
1. Execute `docker stack deploy --compose-file online-services-web/target/docker-compose/docker-compose.yml os-stack`.
* This command will deploy a new stack called _os-stack_ with network and service definitions provided by the _docker-compose.yml_ file.
* To check that the stack is running, execute: `docker stack services os-stack`
* To verify that the application is running, visit _http://localhost:8080_.
* To remove the stack, execute `docker stack rm os-stack`.
* To remove the swarm local cluster, execute `docker swarm leave`.

## Development Conventions

### Formatting

Formatting is defined by `.editorconfig` file. 

To apply this formatting automatically by IntelliJ IDEA, you need to do the following:

1. Install [EditorConfig plugin](https://plugins.jetbrains.com/plugin/7294-editorconfig)
1. Enable EditorConfig support on the *Settings -> Editor -> Code Style* page.    
