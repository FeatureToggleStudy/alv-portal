# Development Setup

## Prerequisites

* JDK 1.8 or later (only required when building with Maven)
* node.js 10.5.x
* npm 6.1.x

## Build & run with Maven

### Build

1. Execute `./mvnw clean install`.

To make IntelliJ IDEA use Maven Wrapper by default, install and enable the following plugin:
* https://plugins.jetbrains.com/plugin/10633-maven-wrapper-support

### Build without tests

* To skip unit tests, execute `./mvnw clean install -DskipTests`.
* To skip integration and UI E2E tests, execute `./mvnw clean install -DskipITs`.
* To skip all tests, execute `./mvnw clean install -DskipTests -DskipITs`.

### Build incl. app docker image

1. First authenticate locally against the internal docker repository as follows: `docker login alvch-dockerv2-local.jfrog.io`.
    * Once executed, the credentials will be stored permanently in your docker config file.
    * For credentials, ask project team members.
1. To build and push the image, execute `./mvnw clean install -Pdocker`
    * If you want skip pushing images, add the following property: *-Ddockerfile.push.skip*

Please note, that pushing docker images locally is usually not needed. It will be performed by the CICD toolchain automatically.

### Run app JAR

1. Execute `java -jar alv-portal-webapp/target/alv-portal-webapp-<project.version>.jar --spring.profiles.active=local`
1. Verify that the application is running by visiting the following URL: _http://localhost:8080_.

In case you want to run the application locally and enable Spring Cloud capabilities:
1. First start all dependencies (will start JHipster registry as docker image): `docker-compose -f alv-portal-webapp/src/docker/local-cloud/docker-compose-deps.yml up -d`
    * Make sure the JHipster Registry has started locally at _http://localhost:8761/_ (credentials: _admin/admin_).
1. Run the app with **local-cloud** profile as follows: `java -jar alv-portal-webapp/target/alv-portal-webapp-<project.version>.jar --spring.profiles.active=local-cloud`
    * Now the portal application should be registered in JHipster Registry (see "Instances" in the web console).

### Run app docker image

1. Execute `docker run -e SPRING_PROFILES_ACTIVE=local -p 8080:8080 alvch-dockerv2-local.jfrog.io/portal:<project.version>`.   
1. Verify that the application is running by visiting the following URL: _http://localhost:8080_.

### Run app docker image with docker-compose

1. First build the project with _docker_ Maven profile (_-Pdocker_).
1. Start one of the available compose files:
    * local setup without spring cloud: `docker-compose -f alv-portal-webapp/target/docker-local-dist/docker-compose.yml up`
    * local setup incl. spring cloud: `docker-compose -f alv-portal-webapp/target/docker-local-cloud-dist/docker-compose-all.yml up`
         * Make sure you use compose files from the _/target_ directory (because of maven variables filtering)

## Build & run with Angular CLI (for local development) 

Before executing any of the following commands:
1. Switch to the **alv-portal-ui** directory.
1. Install NPM dependencies by executing `npm install` command.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the _target/dist_ directory.
* If you don't have installed _ng_ client globally, replace _ng_ command with a full path as follows: `node_modules/.bin/ng build`

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Run development server with Angular CLI

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
