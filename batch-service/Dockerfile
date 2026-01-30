FROM eclipse-temurin:17-jre-focal

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENV JAVA_TOOL_OPTIONS="-Dmicrometer.enable.system.metrics=false -Dmanagement.metrics.binders.enabled=false"

EXPOSE 8083

ENTRYPOINT ["java", "-jar", "/app.jar"]
