FROM openjdk:8u171-jdk-alpine

ARG JAR_FILE
ADD ${JAR_FILE} online-services-web.jar

ENV JAVA_OPTS=${JAVA_OPTS} \
    SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}

EXPOSE 8080
CMD java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /online-services-web.jar

LABEL ch.admin.seco.onlineservices.app=online-services-web
