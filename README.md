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

### Run

1. Execute `java -jar online-services-web/target/online-services-web-*.jar`.
1. Verify that the application is running by visiting the following URL: _http://localhost:8080_.


### Logging
The logs analysis can be performed by using Zipkin - an application that collects tracing data and displays detailed data about it in a web UI.
An instance of Zipkin can be started locally by starting a Docker image:

```docker run -d -p 9411:9411 openzipkin/zipkin
```





## Development Conventions

### Formatting

Formatting is defined by `.editorconfig` file.

To apply this formatting automatically by IntelliJ IDEA, you need to do the following:

1. Install [EditorConfig plugin](https://plugins.jetbrains.com/plugin/7294-editorconfig)
1. Enable EditorConfig support on the *Settings -> Editor -> Code Style* page.    
