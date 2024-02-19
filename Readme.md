# Nodejs-Jenkins-Docker

## Weather Prediction App with Node.js, Jenkins, and Docker

## Description

This project involves the creation of a weather prediction application with a RESTful API endpoint /predict-weather.
The Swagger documentation for the API is available at
http://localhost:8080/api-docs/#/.
Additionally, there is a React.js frontend accessible at
http://localhost:8080.

## Installation

Follow these steps to set up and run the project:

Install Dependencies:
Run

```sh
npm install
```

to install the project dependencies.

Build the Project:
Execute

```sh
npm build
```

to build the project.

Start the Application:
Launch the application with

```sh
npm start
```

You can optionally use

```sh
npm run build
```

command to skip above steps.

Jenkins Integration:
Install Jenkins on your local system, running on port 8081.

Docker Setup:
Install Docker on your local system.

Jenkins Pipeline:
Create jenkins pipeline with github url as
https://github.com/mimohkulkarni/nodejs-jenkins-docker
Run the Jenkins pipeline to create a Docker image.
The Docker image will be available on Docker Hub: mimohkulkarni17/nodejs-jenkins-docker.

Pull Docker Image:
Pull the Docker image using the following command:

```sh
docker pull mimohkulkarni17/nodejs-jenkins-docker:latest
```

Run Docker Container:
Start the Docker container with the following command:

```sh
docker run -p 8080:8080 mimohkulkarni17/nodejs-jenkins-docker:latest
```

Optionally you can change the port 8080 to your desired available port.

Accessing the Application
The Swagger documentation for the API is available at http://localhost:8080/api-docs/#/.
The React.js frontend can be accessed at http://localhost:8080.
Notes
Ensure that all dependencies are installed before building and running the application.
Jenkins and Docker are required for automated build and deployment processes.
The Docker image is available on Docker Hub for easy distribution.
Feel free to customize the steps and information based on your specific project requirements.

## Sequence Diagram / Flowchart

https://drive.google.com/file/d/1GjmwYQ6l4LuV8-XdPd2GEIGGb6fskC_k/view?usp=drive_link
