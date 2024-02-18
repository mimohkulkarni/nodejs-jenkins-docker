node {
    environment {
        DOCKER = credentials('dockerhub')
    }
    stages{
        stage('clone repository') {
            checkout scm  
        }
        stage('Build docker Image'){
            sh 'docker build -t mimohkulkarni17/nodejs-jenkins-docker .'
        }
        stage("Login"){
            steps{
                sh 'echo $DOCKER_PSW | docker login -u $DOCKER_USR --password-stdin'
            }
        }
        stage('Push Image'){
            sh 'docker push mimohkulkarni17/nodejs-jenkins-docker'
        }
    }
    post{
        always{
            sh 'docker logout'
        }
    }
}