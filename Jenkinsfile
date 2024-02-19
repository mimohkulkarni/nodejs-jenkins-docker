pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        IMAGE_NAME = 'mimohkulkarni17/nodejs-jenkins-docker'
        NODEJS_VERSION = '14'  // Change this to your desired Node.js version
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t $IMAGE_NAME:$NODEJS_VERSION ."

                    // Authenticate and push to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USR', passwordVariable: 'DOCKER_PSW')]) {
                        sh "echo \$DOCKER_PSW | docker login -u \$DOCKER_USR --password-stdin"
                        sh "docker push $IMAGE_NAME:$NODEJS_VERSION"
                    }
                }
            }
        }
    }
}
