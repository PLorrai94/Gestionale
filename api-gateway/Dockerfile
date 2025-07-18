FROM openjdk:17-jdk-slim

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENV JAVA_TOOL_OPTIONS="-Dmicrometer.enable.system.metrics=false -Dmanagement.metrics.binders.enabled=false"


ENTRYPOINT ["java", "-jar", "/app.jar"]
