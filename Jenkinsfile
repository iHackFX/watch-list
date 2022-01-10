pipeline {
    agent any
    environment {
        PATH = '/usr/local/bin:/usr/bin:/bin'
    }
    stages {
        stage('NPM Setup') {
            steps {
                sh 'npm install'
            }
        }

        stage('Android Build') {
            steps {
                sh 'ionic cap build android --release'
            }
        }

        stage('Stage Web Build') {
            steps {
                sh 'npm run build --prod'
            }
        }

        stage('Publish Android') {
            steps {
                echo 'Publish Android API Action'
            }
        }
    }
}
