#Stage 1: Build the application
FROM adoptopenjdk/openjdk11:ubi as build


#SET the current working directory inside the image
WORKDIR /app

#COPY maven executable to the image
COPY mvnw .
COPY .mvn .mvn

#Copy the pom.xml
COPY pom.xml .

#Build all the dependenccies in the preparation to go offline
#This is a separate step so the dependencies will be cached unless
RUN ./mvnw dependency:go-offline -B

#Copy the project source
COPY src src

#Package the application
RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

#Stage 2: A minimal docker image with command to run the app
FROM adoptopenjdk/openjdk11:ubi

ARG DEPENDENCY=/app/target/dependency

#Copy project dependency from the build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT [ "java","-cp","app:app/lib/*","com.app.BackEndApplication" ]




