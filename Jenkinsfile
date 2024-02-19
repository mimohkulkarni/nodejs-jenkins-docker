node {
    def app 
    stage('clone repository') {
      checkout scm  
    }
     stage('Push Image'){
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app = docker.build("mimohkulkarni17/nodejs-jenkins-docker")
            app.push()
            app.push("${env.BUILD_NUMBER}")       
            app.push("latest")   
        }
     }
}