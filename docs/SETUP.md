# Development Setup

## Prerequisites

* JDK 1.8 or later
* node.js 10.5.x
* npm 6.1.x

## Build

1. Execute `./mvnw clean install`.

### Build without tests

* To skip unit tests, execute `./mvnw clean install -DskipTests`.
* To skip integration and UI E2E tests, execute `./mvnw clean install -DskipITs`.
* To skip all tests, execute `./mvnw clean install -DskipTests -DskipITs`.

### Build incl. app docker image

1. First authenticate locally against the internal docker repository as follows: `docker login alvch-dockerv2-local.jfrog.io`.
    * Once executed, the credentials will be stored permanently in your docker config file.
1. Build or/and push the image separately:
    1. Build the project as usually with: `./mvnw clean install` 
    1. To build the image, execute `./mvnw -pl online-services-web dockerfile:build`
    1. To push the image, execute `./mvnw -pl online-services-web dockerfile:push`
1. Alternatively you can build or/and push the image together with building the whole project:
    1. To build the project and image, execute: `./mvnw clean install -P docker`
    1. To build the project inl. building and pushing the image, execute: `./mvnw clean install -P docker -Ddocker-push`

Please note, that pushing docker images locally is usually not needed. It will be performed by the CICD toolchain automatically.

## Run

### Run app JAR

1. Execute `java -jar online-services-web/target/online-services-web-*.jar`.
1. Verify that the application is running by visiting the following URL: _http://localhost:8080_.

### Run app docker image

1. Execute `docker run -p 8080:8080 alvch-dockerv2-local.jfrog.io/alvch/online-services:<project.version>`.
1. Verify that the application is running by visiting the following URL: _http://localhost:8080_.

### Run app docker image incl. all dependencies using docker-compose (recommended, if you want to test docker setup locally)

1. First build the project including building of the docker image as described above.
1. Execute `docker-compose -f online-services-deployment/target/docker-compose/docker-compose.yml up`.
1. Verify that the application is running by visiting the following URL: _http://localhost:8999_.

### Run app docker image incl. all dependencies in docker swarm mode (locally)

1. Execute `docker swarm init`
* Execute only once. This command will initialize a docker swarm cluster on your localhost.
1. Execute `docker stack deploy --compose-file online-services-deployment/target/docker/docker-compose.yml os-stack`.
* This command will deploy a new stack called _os-stack_ with network and service definitions provided by the _docker-compose.yml_ file.
* To check that the stack is running, execute: `docker stack services os-stack`
* To verify that the application is running, visit _http://localhost:8999_.
* To remove the stack, execute `docker stack rm os-stack`.
* To remove the swarm local cluster, execute `docker swarm leave`.

## Logging

The logs analysis can be performed by using _Zipkin_ - an application that collects tracing data and displays detailed data about it in a web UI.

To use zipkin:
1. Build your application with Maven _zipkin_ profile: `./mvnw clean install -Pzipkin`
1. Start Zipkin: `docker run -d -p 9411:9411 openzipkin/zipkin`
1. Start the application with your local profile: `java -jar online-services-web/target/online-services-web-*.jar --spring.profiles.active=local`
1. Browse the logs at __http://localhost:9411/zipkin/__.
