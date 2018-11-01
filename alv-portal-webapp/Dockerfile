FROM openjdk:8u171-jdk-alpine

ARG JAR_FILE
COPY ${JAR_FILE} alv-portal-webapp.jar

ENV JAVA_OPTS=${JAVA_OPTS}
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}

EXPOSE 8080

ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /alv-portal-webapp.jar

LABEL ch.admin.seco.app=portal
