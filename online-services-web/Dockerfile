FROM openjdk:8u171-jdk-alpine

ARG JAR_FILE
ADD ${JAR_FILE} online-services.jar

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/online-services.jar"]

LABEL ch.admin.seco.onlineservices.app=online-services-web
