FROM openjdk:19
MAINTAINER myname
COPY ./example-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]